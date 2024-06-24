// checkoutController.js
import crypto from 'crypto';
import querystring from 'qs';
import * as dotenv from 'dotenv';

dotenv.config();  // Load các biến môi trường từ file .env

export const createPaymentUrl = (req, res) => {
  const { amount, orderDescription, orderType, language, bankCode } = req.body;

  let vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE;
  vnp_Params['vnp_Locale'] = language || 'vn';
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_TxnRef'] = generateOrderId(); // Tạo hàm generateOrderId để sinh mã đơn hàng
  vnp_Params['vnp_OrderInfo'] = orderDescription;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = amount * 100; // Chuyển đổi amount sang đơn vị VNĐ (số tiền * 100)
  vnp_Params['vnp_ReturnUrl'] = process.env.VNP_RETURNURL;
  vnp_Params['vnp_IpAddr'] = req.ip;

  if (bankCode) {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params['vnp_CreateDate'] = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
  vnp_Params['vnp_SecureHash'] = signed;
  const vnpUrl = process.env.VNP_URL + '?' + querystring.stringify(vnp_Params, { encode: false });

  res.status(200).json({ vnpUrl });
};

export const vnpayReturn = (req, res) => {
  let vnp_Params = req.query;
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    res.status(200).json({ message: 'success' });
  } else {
    res.status(400).json({ message: 'fail' });
  }
};

function sortObject(obj) {
  const sorted = {};
  const keys = Object.keys(obj).sort();
  keys.forEach(key => {
    sorted[key] = obj[key];
  });
  return sorted;
}

function generateOrderId() {
  const date = new Date();
  const orderId = date.getTime().toString(); // Sử dụng timestamp làm orderId, bạn có thể thay đổi theo nhu cầu
  return orderId;
}
