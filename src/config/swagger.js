const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BookStore Swagger Documents!",
            version: "1.0.0",
        },
        components: {
            schemas: {
                LoginRequest: {
                    type: "object",
                    required: ["username", "password"],
                    properties: {
                        username: {
                            type: "string",
                            example: "abc1234"
                        },
                        password: {
                            type: "string",
                            example: "password"
                        }
                    }
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        data: {
                            type: "object",
                            properties: {
                                accessToken: {
                                    type: "string"
                                },
                                refreshToken: {
                                    type: "string"
                                },
                                accessTokenExpiresAt: {
                                    type: "string",
                                    example: "2025-12-13T17:46:41.482Z"
                                },
                                user: {
                                    $ref: "#/components/schemas/SignupResponse"    
                                }

                            }
                        },
                        meta: {
                            type: "object",
                            properties: {
                                timestamp: {
                                    type: "string",
                                    example: "2025-12-13T17:46:41.482Z"
                                }
                            }
                        }

                    }
                },
                SignupRequest: {
                    type: "object",
                    required: ["username", "password", "name"],
                    properties: {
                        username: {
                            type: "string",
                            example: "user123",
                        },
                        password: {
                            type: "string",
                            example: "password1234",
                        },
                        name: {
                            type: "string",
                            example: "홍길동",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            example: "user123@example.com",
                        },
                        phone: {
                            type: "string",
                            example: "01012345678",
                        },
                    },
                },

                SignupResponse: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1,
                        },
                        username: {
                            type: "string",
                            example: "user123",
                        },
                        name: {
                            type: "string",
                            example: "홍길동",
                        },
                        email: {
                            type: "string",
                            example: "user123@example.com",
                        },
                        phone: {
                            type: "string",
                            example: "01012341234"
                        },
                        role: {
                            type: "string",
                            example: "CUSTOMER",
                        },
                    },
                },

                ErrorResponse: {
                    type: "object",
                    properties: {
                        error: {
                            type: "string",
                            example: "bad_request"
                        },
                        message: {
                            type: "string",
                            example: "이미 존재하는 사용자입니다.",
                        }
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.route.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
