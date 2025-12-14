const sequelize = require("../config/sequelize");

// 모델 불러오기
const User = require("./User");
const RefreshToken = require("./RefreshToken");
const Wishlist = require("./Wishlist");
const Wishlist_Item = require("./Wishlist_Item");
const Book = require("./Book");
const Category = require("./Category");
const Book_Category = require("./Book_Category");
const Author = require("./Author");
const Book_Author = require("./Book_Author");
const Review = require("./Review");
const Review_Like = require("./Review_Like");
const Cart = require("./Cart");
const Cart_Item = require("./Cart_Item");
const Order = require("./Order");
const Order_Item = require("./Order_Item");

// 리프레시 토큰
User.hasMany(RefreshToken, { foreignKey: "user_id" });
RefreshToken.belongsTo(User, { foreignKey: "user_id" });

// 위시리스트
User.hasOne(Wishlist, { foreignKey: "user_id", onDelete: "CASCADE"});
Wishlist.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

// 위시리스트 아이템
Wishlist.hasMany(Wishlist_Item, { foreignKey: "wishlist_id" });
Wishlist_Item.belongsTo(Wishlist, { foreignKey: "wishlist_id" });
Book.hasMany(Wishlist_Item, { foreignKey: "book_id" });
Wishlist_Item.belongsTo(Book, { foreignKey: "book_id" });

// 책 카테고리
Book.belongsToMany(Category, { through: Book_Category, foreignKey: "book_id", otherKey: "category_id", onDelete: "CASCADE" });
Category.belongsToMany(Book, { through: Book_Category, foreignKey: "category_id", otherKey: "book_id", onDelete: "CASCADE" });

// 책 저자
Book.belongsToMany(Author, { through: Book_Author, foreignKey: "book_id", otherKey: "author_id", onDelete: "CASCADE" });
Author.belongsToMany(Book, { through: Book_Author, foreignKey: "author_id", otherKey: "book_id", onDelete: "CASCADE" });

// 판매자
User.hasMany(Book, { foreignKey: "seller_id" });
Book.belongsTo(User, { foreignKey: "seller_id" });

// 리뷰, 좋아요
User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });
Book.hasMany(Review, { foreignKey: "book_id" });
Review.belongsTo(Book, { foreignKey: "book_id" });

Review.hasMany(Review_Like, { foreignKey: "review_id" });
Review_Like.belongsTo(Review, { foreignKey: "review_id" });
User.hasMany(Review_Like, { foreignKey: "user_id" });
Review_Like.belongsTo(User, { foreignKey: "user_id" });

// 장바구니
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });
Cart.hasMany(Cart_Item, { foreignKey: "cart_id" });
Cart_Item.belongsTo(Cart, { foreignKey: "cart_id" });
Book.hasMany(Cart_Item, { foreignKey: "book_id" });
Cart_Item.belongsTo(Book, { foreignKey: "book_id" });

// 주문
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });
Order.hasMany(Order_Item, { foreignKey: "order_id" });
Order_Item.belongsTo(Order, { foreignKey: "order_id" });
Book.hasMany(Order_Item, { foreignKey: "book_id" });
Order_Item.belongsTo(Book, { foreignKey: "book_id" });


// 중앙에서 한 번만 sync 실행
sequelize.sync({force: true})

// models 객체 내보내기
module.exports = {
    sequelize,
    User,
    RefreshToken,
    Wishlist,
    Wishlist_Item,
    Book,
    Category,
    Book_Category,
    Author,
    Book_Author,
    Review,
    Review_Like,
    Cart,
    Cart_Item,
    Order,
    Order_Item,
};


