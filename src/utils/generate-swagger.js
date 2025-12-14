const fs = require('fs');
const path = require('path');

function generateSwagger(outputPath) {
    // require will build the swagger spec from ./src/config/swagger.js
    const swaggerSpec = require('../config/swagger');

    const out = outputPath || path.join(process.cwd(), 'swagger.json');
    const dir = path.dirname(out);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(out, JSON.stringify(swaggerSpec, null, 2), 'utf8');
    return out;
}

if (require.main === module) {
    const arg = process.argv[2];
    try {
        const out = generateSwagger(arg);
        console.log(`Swagger spec successfully written to: ${out}`);
    } catch (err) {
        console.error('Failed to generate swagger spec:', err);
        process.exit(1);
    }
}

module.exports = generateSwagger;
