const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BookStore Swagger Documents!",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    schema: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                GetAllAuthorResponse: {
                    type: "object",
                    properties: {
                        data: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Author"
                            }
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
                        }
                    }
                },
                CreateAuthorResponse: {
                    type: "object",
                    properties: {
                        data: {
                            $ref: "#/components/schemas/Author"
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
                        }
                    }
                },
                Author: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "히가시노"
                        },
                        birth: {
                            type: "string",
                            example: "2025-12-11"
                        },
                        description: {
                            type: "string",
                            description: "저자 설명"
                        }
                    }
                },
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
                Meta: {
                    type: "object",
                    properties: {
                        timestamp: {
                            type: "string",
                            example: "2025-12-13T17:46:41.482Z"
                        }
                    }
                },
                User: {
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
                    }
                },
                Category: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            example: 1
                        },
                        name: {
                            type: "string",
                            example: "소설"
                        }
                    }
                },
                CreateCategoryResponse: {
                    type: "object",
                    properties: {
                        data: {
                            $ref: "#/components/schemas/Category"
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
                        }
                    }
                },
                GetAllCategoriesResponse: {
                    type: "object",
                    properties: {
                        data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Category" }
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
                        }
                    }
                },
                SignupResponse: {
                    type: "object",
                    properties: {
                        data: {
                            $ref: "#/components/schemas/User"
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
                        }
                    }
                },
                UsersResponse: {
                    type: "object",
                    properties: {
                        data: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/User"
                            }
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
                        }
                    }
                },
                StandardResponse: {
                    type: "object",
                    properties: {
                        data: {
                            oneOf: [
                                { type: "object" },
                                { type: "array" }
                            ]
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
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
                                    $ref: "#/components/schemas/User"
                                }

                            }
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
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

                

                ErrorResponse: {
                    type: "object",
                    properties: {
                        data: {
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
                            }
                        },
                        meta: {
                            $ref: "#/components/schemas/Meta"
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
