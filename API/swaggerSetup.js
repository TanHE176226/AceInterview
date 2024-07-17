import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function setupSwagger(app, basePath, routeFile, title, description) {
    const options = {
        definition: {
            openapi: '3.0.0',
            info: {
                title: title,
                version: '1.0.0',
                description: description,
            },

        },
        apis: [routeFile],
    };

    const specs = swaggerJsdoc(options);

    app.use(`${basePath}/api-docs`, swaggerUi.serve, swaggerUi.setup(specs));
}