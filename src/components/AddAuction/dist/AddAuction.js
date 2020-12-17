"use strict";
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
var Select_1 = require("../CommonComponents/Select/Select");
var SelectDate_1 = require("../CommonComponents/SelectDate/SelectDate");
var moment_1 = require("moment");
var productsService_1 = require("../../services/productsService");
var auction_service_1 = require("../../services/auction-service");
var AutoCompleteDropdown_1 = require("../CommonComponents/AutoCompleteDropdown/AutoCompleteDropdown");
var AddAuction = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(false), modalOpen = _a[0], setModalOpen = _a[1];
    var _b = react_1.useState(""), auctionName = _b[0], setAuctionName = _b[1];
    var _c = react_1.useState({ name: '', id: -1 }), category = _c[0], setCategory = _c[1];
    var _d = react_1.useState([]), categoryOptions = _d[0], setCategoryOptions = _d[1];
    var _e = react_1.useState(true), hasMoreCategoryOptions = _e[0], setHasMoreCategoryOptions = _e[1];
    var _f = react_1.useState(true), hasMoreSubCategoryOptions = _f[0], setHasMoreSubCategoryOptions = _f[1];
    var _g = react_1.useState(""), subCategory = _g[0], setSubCategory = _g[1];
    var _h = react_1.useState([]), subCategoryOptions = _h[0], setSubCategoryOptions = _h[1];
    var _j = react_1.useState(""), product = _j[0], setProduct = _j[1];
    var _k = react_1.useState([]), productOptions = _k[0], setProductOptions = _k[1];
    var _l = react_1.useState(""), endDate = _l[0], setEndDate = _l[1];
    var _m = react_1.useState(false), showAddProduct = _m[0], setShowAddProduct = _m[1];
    var _o = react_1.useState([]), priceLevels = _o[0], setPriceLevels = _o[1];
    var rbp = 50;
    var handleOpen = function () { return setModalOpen(true); };
    var handleClose = function () {
        setModalOpen(false);
        setShowAddProduct(false);
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
            setHasMoreCategoryOptions(res.data.hasMore);
            dispatch(categories_1.fetchCategoriesSuccess(res.data.categories));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var fetchSubCategoriesCall = function (page, searchWord) {
        if (searchWord === void 0) { searchWord = ""; }
        debugger;
        setSubCategory(searchWord);
        categoriesService_2.fetchSubCategories(page, searchWord, rbp, category.id)
            .then(function (res) {
            debugger;
            if (page > 1) {
                setSubCategoryOptions(subCategoryOptions.concat(res.data.subCategories));
            }
            else {
                setSubCategoryOptions(res.data.subCategories);
            }
            setHasMoreSubCategoryOptions(res.data.hasMore);
            dispatch(categories_1.fetchCategoriesSuccess(res.data.subCategories));
        })["catch"](function (err) { return console.log("err", err); });
    };
    var handleCategoryChange = function (categoryName, categoryId) {
        setCategory({ name: categoryName, id: categoryId });
        setSubCategory("");
        setProduct("");
        categoriesService_2.fetchSubCategories(1, '', rbp, 1)
            .then(function (res) {
            if (res.data.length !== 0) {
                setSubCategoryOptions(res.data);
            }
            else {
                handleSubCategoryChange({ target: { value: -1 } });
            }
        })["catch"](function (err) { return console.log("err", err); });
    };
    var handleSubCategoryChange = function (e) {
        var subCat = e.target.value;
        setProduct("");
        setSubCategory(subCat.toString());
        if (subCat === -1) {
            productsService_1.fetchProductsByCategory(category.name);
        }
        else {
            productsService_1.fetchProductsBySubCategory(category.name).then(function (res) {
                setProductOptions(res.data);
            });
        }
    };
    var handleProductChange = function (e) { return setProduct(e.target.value); };
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
    var renderOptions = function (options) {
        if (options.length === 0) {
            return (react_1["default"].createElement(core_1.MenuItem, { key: "none", value: -1 }, "No options available"));
        }
        else
            return options.map(function (option, index) {
                return (react_1["default"].createElement(core_1.MenuItem, { key: index, value: option.id }, option.name));
            });
    };
    return (react_1["default"].createElement(AuctionCard_1["default"], { className: "noBorder" },
        react_1["default"].createElement(IconButton_1["default"], { className: "iconButton", onClick: handleOpen },
            react_1["default"].createElement(AddCircleOutline_1["default"], { style: { fontSize: 170 } })),
        react_1["default"].createElement(Dialog_1["default"], { fullWidth: true, open: modalOpen, onClose: handleClose, "aria-labelledby": "form-dialog-title" },
            react_1["default"].createElement(DialogTitle_1["default"], { id: "form-dialog-title" }, "Add New Auction"),
            react_1["default"].createElement(core_1.Divider, null),
            react_1["default"].createElement(DialogContent_1["default"], null,
                react_1["default"].createElement(TextField_1["default"], { autoFocus: true, variant: "outlined", size: "small", label: "Title", type: "text", margin: "normal", fullWidth: true, value: auctionName, onChange: function (e) { return setAuctionName(e.target.value); } }),
                react_1["default"].createElement("div", { className: "auto-complete-container" }, (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleCategoryChange, hasMore: hasMoreCategoryOptions, key: "catergory-auto-complete", id: "catergory-auto-complete", name: "Category", options: categoryOptions, searchWord: category.name, fetchMoreData: (function (page, searchWord) { return fetchCategoriesCall(page, searchWord); }) }))),
                react_1["default"].createElement("div", { className: "auto-complete-container" }, (react_1["default"].createElement(AutoCompleteDropdown_1["default"], { onChange: handleSubCategoryChange, hasMore: hasMoreSubCategoryOptions, key: "sub-catergory-auto-complete", id: "sub-catergory-auto-complete", name: "Sub Category", options: subCategoryOptions, searchWord: subCategory, fetchMoreData: (function (page, searchWord) { return fetchSubCategoriesCall(page, searchWord); }) }))),
                react_1["default"].createElement("div", { className: "test" },
                    react_1["default"].createElement(Select_1["default"], { required: true, label: "Product", onChange: handleProductChange, value: product }, renderOptions(productOptions)),
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
