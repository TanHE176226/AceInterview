import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory as Buffer

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // Limit file size to 10MB
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('application/pdf')) {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
});

export default upload;
