"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
require("./AddAuction.scss");
var IconButton_1 = require("@material-ui/core/IconButton");
var AddCircleOutline_1 = require("@material-ui/icons/AddCircleOutline");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var TextField_1 = require("@material-ui/core/TextField");
var core_1 = require("@material-ui/core");
var categoriesService_1 = require("../../services/categoriesService");
var categoriesService_2 = require("../../services/categoriesService");
var categories_1 = require("../../redux/actions/categories");
var AuctionCard_1 = require("../Auctions/AuctionCard/AuctionCard");
var AddProduct_1 = require("../AddProduct/AddProduct");
var PriceLevels_1 = require("../PriceLevels/PriceLevels");
var SelectDate_1 = require("../CommonComponents/SelectDate/SelectDate");
var moment_1 = require("moment");
var productsService_1 = require("../../services/productsService");
var auction_service_1 = require("../../services/auction-service");
var AutoCompleteDropdown_1 = require("../CommonComponents/AutoCompleteDropdown/AutoCompleteDropdown");
var brandsService_1 = require("../../services/brandsService");
var modelsService_1 = require("../../services/modelsService");
var AddAuction = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(false), modalOpen = _a[0], setModalOpen = _a[1];
    var _b = react_1.useState(""), auctionName = _b[0], setAuctionName = _b[1];
    var _c = react_1.useState({ name: '', id: -1 }), category = _c[0], setCategory = _c[1];
    var _d = react_1.useState([]), categoryOptions = _d[0], setCategoryOptions = _d[1];
    var _e = react_1.useState({ name: '', id: -1 }), subCategory = _e[0], setSubCategory = _e[1];
    var _f = react_1.useState([]), subCategoryOptions = _f[0], setSubCategoryOptions = _f[1];
    var _g = react_1.useState({ name: '', id: -1 }), product = _g[0], setProduct = _g[1];
    var _h = react_1.useState([]), productOptions = _h[0], setProductOptions = _h[1];
    var _j = react_1.useState({ name: '', id: -1 }), model = _j[0], setModel = _j[1];
    var _k = react_1.useState([]), modelOptions = _k[0], setModelsOptions = _k[1];
    var _l = react_1.useState({ name: '', id: -1 }), brand = _l[0], setBrand = _l[1];
    var _m = react_1.useState([]), brandOptions = _m[0], setBrandsOptions = _m[1];
    var _o = react_1.useState({
        category: true,
        subCategory: true,
        product: true,
        brand: true,
        model: true
    }), hasMore = _o[0], setHaseMore = _o[1];
    var _p = react_1.useState(""), endDate = _p[0], setEndDate = _p[1];
    var _q = react_1.useState([]), priceLevels = _q[0], setPriceLevels = _q[1];
    var rbp = 50;
    var handleOpen = function () { return setModalOpen(true); };
    var handleClose = function () {
        setModalOpen(false);
    };
    var fetchCategoriesCall = function (page, searchWord) {
        if (searchWord === void 0) { searchWord = ""; }
        setCategory({ name: searchWord, id: category.id });
        dispatch(categories_1.fetchCategoriesStarted());
        categoriesService_1.fetchCategories(page, searchWord, rbp)
            .then(function (res) {
            if (page > 1) {
                setCategoryOptions(categoryOptions.concat(res.data.categories));
            }
            else {
                setCategoryOptions(res.data.categories);
            }
            setHaseMore(__assign(__assign({}, hasMore), { category: res.data.hasMore }));
            dispatch(categories_1.fetchCategoriesSuccess(res.data.categories));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var fetchSubCategoriesCall = function (page, searchWord, categoryId) {
        if (searchWord === void 0) { searchWord = ""; }
        setSubCategory({ name: searchWord, id: subCategory.id });
        categoriesService_2.fetchSubCategories(page, searchWord, rbp, categoryId)
            .then(function (res) {
            if (page > 1) {
                setSubCategoryOptions(subCategoryOptions.concat(res.data.subCategories));
            }
            else {
                setSubCategoryOptions(res.data.subCategories);
            }
            setHaseMore(__assign(__assign({}, hasMore), { subCategory: res.data.hasMore }));
            dispatch(categories_1.fetchCategoriesSuccess(res.data.subCategories));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var fetchBrandsCall = function (page, searchWord, categoryId, subCategoryId) {
        if (searchWord === void 0) { searchWord = ""; }
        setBrand({ name: searchWord, id: product.id });
        brandsService_1.fetchBrands(page, searchWord, rbp, categoryId, subCategoryId)
            .then(function (res) {
            if (page > 1) {
                setBrandsOptions(modelOptions.concat(res.data.brands));
            }
            else {
                setBrandsOptions(res.data.brands);
            }
            setHaseMore(__assign(__assign({}, hasMore), { brand: res.data.hasMore }));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var fetchModelsCall = function (page, searchWord, categoryId, subCategoryId, brandId) {
        if (searchWord === void 0) { searchWord = ""; }
        setProduct({ name: searchWord, id: product.id });
        modelsService_1.fetchModels(page, searchWord, rbp, categoryId, subCategoryId, brandId)
            .then(function (res) {
            if (page > 1) {
                setModelsOptions(modelOptions.concat(res.data.models));
            }
            else {
                setModelsOptions(res.data.products);
            }
            setHaseMore(__assign(__assign({}, hasMore), { model: res.data.hasMore }));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var fetchProductsCall = function (page, searchWord, categoryId, subCategoryId) {
        if (searchWord === void 0) { searchWord = ""; }
        setProduct({ name: searchWord, id: product.id });
        productsService_1.fetchProducts(page, searchWord, rbp, categoryId, subCategoryId)
            .then(function (res) {
            if (page > 1) {
                setProductOptions(productOptions.concat(res.data.products));
            }
            else {
                setProductOptions(res.data.products);
            }
            setHaseMore(__assign(__assign({}, hasMore), { product: res.data.hasMore }));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var handleCategoryChange = function (categoryName, categoryId) {
        setCategory({ name: categoryName, id: categoryId });
        setSubCategory({ name: '', id: -1 });
        setProduct({ name: '', id: -1 });
        fetchSubCategoriesCall(1, '', categoryId);
        fetchProductsCall(1, '', categoryId, -1);
    };
    var handleSubCategoryChange = function (subCategoryName, subCategoryId) {
        setSubCategory({ name: subCategoryName, id: subCategoryId });
        setProduct({ name: '', id: -1 });
        fetchProductsCall(1, '', category.id, subCategoryId);
    };
    var handleProdcutsChange = function (productName, prodcutId) {
        setProduct({ name: productName, id: prodcutId });
    };
    var handleEndDateChange = function (e) {
        setEndDate(e.target.value);
    };
    var handleSave = function () {
        var auctionData = {
            auctionName: auctionName,
            category: category,
            subCategory: subCategory,
            product: product,
            priceLevels: priceLevels,
            endDate: endDate,
            name: auctionName
        };
        auction_service_1.auctionService.createAuction(auctionData).then(function (res) { });
    };
    var addPriceLevel = function (_a) {
        var price = _a.price, minRegisters = _a.minRegisters;
        var newPriceLevel = { price: price, minRegisters: minRegisters };
        if (priceLevels.length === 0) {
            setPriceLevels([newPriceLevel]);
        }
        else {
            var indexToInsert = priceLevels.findIndex(function (priceLevel) { return price <= priceLevel.price; });
            if (indexToInsert === -1) {
                setPriceLevels(__spreadArrays(priceLevels, [newPriceLevel]));
            }
            else {
                var newPriceLevels = __spreadArrays(priceLevels);
                newPriceLevels.splice(indexToInsert, 0, newPriceLevel);
                setPriceLevels(newPriceLevels);
            }
        }
    };
    var removePriceLevel = function (index) {
        var newPriceLevels = __spreadArrays(priceLevels);
        newPriceLevels.splice(index, 1);
        setPriceLevels(newPriceLevels);
    };
    return (react_1["default"].createElement(AuctionCard_1["default"], { className: "noBorder" },
        react_1["default"].createElement(IconButton_1["default"], { className: "iconButton", onClick: handleOpen },
            react_1["default"].createElement(AddCircleOutline_1["default"], { style: { fontSize: 170 } })),
        react_1["default"].createElement(Dialog_1["default"], { fullWidth: true, open: modalOpen, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
            react_1["default"].createElement(DialogTitle_1["default"], { id: "form-dialog-title" }, "Add New Auction"),
            react_1["default"].createElement(core_1.Divider, null),
            react_1["default"].createElement(DialogContent_1["default"], null,
                react_1["default"].createElement(TextField_1["default"], { autoFocus: true, variant: "outlined", size: "small", label: "Title", type: "text", margin: "normal", fullWidth: true, value: auctionName, onChange: function (e) { return setAuctionName(e.target.value); } }),
                react_1["default"].createElement("div", { className: "auto-complete-container" }, (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleCategoryChange, hasMore: hasMore.category, key: "catergory-auto-complete", id: "catergory-auto-complete", name: "Category", options: categoryOptions, searchWord: category.name, fetchMoreData: (function (page, searchWord) { return fetchCategoriesCall(page, searchWord); }) }))),
                react_1["default"].createElement("div", { className: "auto-complete-container" }, (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleSubCategoryChange, hasMore: hasMore.subCategory, key: "sub-catergory-auto-complete", id: "sub-catergory-auto-complete", name: "Sub Category", options: subCategoryOptions, searchWord: subCategory.name, fetchMoreData: (function (page, searchWord) { return fetchSubCategoriesCall(page, searchWord, category.id); }) }))),
                react_1["default"].createElement("div", { className: "auto-complete-container" },
                    (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleProdcutsChange, hasMore: hasMore.brand, key: "brands-auto-complete", id: "brands-auto-complete", name: "Brand", options: brandOptions, searchWord: brand.name, fetchMoreData: (function (page, searchWord) { return fetchBrandsCall(page, searchWord, category.id, subCategory.id); }) })),
                    react_1["default"].createElement(AddProduct_1["default"], { categories: categoryOptions })),
                react_1["default"].createElement("div", { className: "auto-complete-container" }, (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleSubCategoryChange, hasMore: hasMore.model, key: "model-auto-complete", id: "model-auto-complete", name: "Model", options: modelOptions, searchWord: model.name, fetchMoreData: (function (page, searchWord) { return fetchModelsCall(page, searchWord, category.id, subCategory.id, brand.id); }) }))),
                react_1["default"].createElement("div", { className: "auto-complete-container" },
                    (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleProdcutsChange, hasMore: hasMore.product, key: "product-auto-complete", id: "product-auto-complete", name: "Product", options: productOptions, searchWord: product.name, fetchMoreData: (function (page, searchWord) { return fetchProductsCall(page, searchWord, category.id, subCategory.id); }) })),
                    react_1["default"].createElement(AddProduct_1["default"], { categories: categoryOptions })),
                react_1["default"].createElement(SelectDate_1["default"], { label: "end date", onChange: handleEndDateChange, defaultValue: moment_1["default"]().format("YYYY-MM-DDTHH:00"), InputLabelProps: {
                        shrink: true
                    } }),
                react_1["default"].createElement(core_1.Divider, { classes: { root: "divider" } }),
                react_1["default"].createElement(PriceLevels_1["default"], { priceLevels: priceLevels, addPriceLevel: addPriceLevel, removePriceLevel: removePriceLevel })),
            react_1["default"].createElement(DialogActions_1["default"], null,
                react_1["default"].createElement(core_1.Button, { onClick: handleClose, color: "primary" }, "Cancel"),
                react_1["default"].createElement(core_1.Button, { onClick: handleSave, color: "primary" }, "Save")))));
};
exports["default"] = AddAuction;
