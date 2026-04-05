const productModel = require("../models/productModel");
const storeModel = require("../models/storeModel");

function renderProductPage(res, username, extraData = {}) {
  productModel.getAllProducts((err, products) => {
    if (err) return res.send("Error loading products");

    storeModel.getAllStores((err, stores) => {
      if (err) return res.send("Error loading stores");

      res.render("product", {
        username,
        products,
        stores,
        ...extraData
      });
    });
  });
}

function validateProductInput(body) {
  const errors = [];

  const price = Number(body.price);
  const amountSold = Number(body.amount_sold);
  const amountStocked = Number(body.amount_stocked);

  if (!Number.isFinite(price) || price <= 0) {
    errors.push("Price must be a number greater than 0.");
  }

  if (!Number.isInteger(amountSold) || amountSold < 0) {
    errors.push("Amount sold must be a whole number 0 or greater.");
  }

  if (!Number.isInteger(amountStocked) || amountStocked < 0) {
    errors.push("Amount stocked must be a whole number 0 or greater.");
  }

  return errors;
}

function validateStoreInput(body) {
  const errors = [];

  const customersServed = Number(body.customers_served);
  const productsStocked = Number(body.products_stocked);

  if (!Number.isInteger(customersServed) || customersServed < 0) {
    errors.push("Customers served must be a whole number 0 or greater.");
  }

  if (!Number.isInteger(productsStocked) || productsStocked < 0) {
    errors.push("Products stocked must be a whole number 0 or greater.");
  }

  return errors;
}

function showProducts(req, res) {
  const username = req.query.username;
  if (!username) return res.redirect("/?error=Unauthorized access");
  renderProductPage(res, username);
}

function addProduct(req, res) {
  const { username } = req.body;
  const errors = validateProductInput(req.body);

  if (errors.length > 0) {
    return renderProductPage(res, username, {
      productValidationErrors: errors,
      addProductForm: {
        item: req.body.item,
        price: req.body.price,
        amount_sold: req.body.amount_sold,
        amount_stocked: req.body.amount_stocked,
        discounts: req.body.discounts,
        popularity: req.body.popularity,
        competitors: req.body.competitors
      }
    });
  }

  productModel.addProduct(req.body, (err) => {
    if (err) {
      console.error(err);
      return renderProductPage(res, username, {
        productValidationErrors: ["Could not add product due to a database error."],
        addProductForm: {
          item: req.body.item,
          price: req.body.price,
          amount_sold: req.body.amount_sold,
          amount_stocked: req.body.amount_stocked,
          discounts: req.body.discounts,
          popularity: req.body.popularity,
          competitors: req.body.competitors
        }
      });
    }

    res.redirect("/product?username=" + encodeURIComponent(username));
  });
}

function deleteProduct(req, res) {
  const { item, username } = req.body;
  productModel.deleteProduct(item, (err) => {
    if (err) console.error(err);
    res.redirect("/product?username=" + encodeURIComponent(username));
  });
}

function updateProduct(req, res) {
  productModel.updateProduct(req.body, (err) => {
    if (err) console.error(err);
    res.sendStatus(200);
  });
}

function addStore(req, res) {
  const { username } = req.body;
  const errors = validateStoreInput(req.body);

  if (errors.length > 0) {
    return renderProductPage(res, username, {
      storeValidationErrors: errors,
      addStoreForm: {
        name: req.body.name,
        customers_served: req.body.customers_served,
        products_stocked: req.body.products_stocked,
        competitors: req.body.competitors,
        financial_position: req.body.financial_position,
        product_shipments: req.body.product_shipments
      }
    });
  }

  storeModel.addStore(req.body, (err) => {
    if (err) {
      console.error(err);
      return renderProductPage(res, username, {
        storeValidationErrors: ["Could not add store due to a database error."],
        addStoreForm: {
          name: req.body.name,
          customers_served: req.body.customers_served,
          products_stocked: req.body.products_stocked,
          competitors: req.body.competitors,
          financial_position: req.body.financial_position,
          product_shipments: req.body.product_shipments
        }
      });
    }

    res.redirect("/product?username=" + encodeURIComponent(username));
  });
}

function deleteStore(req, res) {
  const { name, username } = req.body;
  storeModel.deleteStore(name, (err) => {
    if (err) console.error(err);
    res.redirect("/product?username=" + encodeURIComponent(username));
  });
}

function stockCalculator(req, res) {
  const { item, username } = req.body;

  productModel.getProductByItem(item, (err, row) => {
    if (err) {
      return renderProductPage(res, username, { stockError: "Database error occurred." });
    }
    if (!row) {
      return renderProductPage(res, username, {
        stockError: `Item "${item}" not found in the database.`
      });
    }

    const sold = parseInt(row.amount_sold);
    const yearly = sold * 12;

    return renderProductPage(res, username, {
      stockResult: { item, sold, yearly }
    });
  });
}

function revenueCalculator(req, res) {
  const { item, username } = req.body;

  productModel.getProductByItem(item, (err, row) => {
    if (err) {
      return renderProductPage(res, username, { revenueError: "Database error occurred." });
    }
    if (!row) {
      return renderProductPage(res, username, {
        revenueError: `Product "${item}" not found in the database.`
      });
    }

    const price = parseFloat(row.price);
    const sold = parseInt(row.amount_sold);
    const yearlyRevenue = (price * sold * 12).toFixed(2);

    return renderProductPage(res, username, {
      revenueResult: { item, price, sold, yearlyRevenue }
    });
  });
}

module.exports = {
  showProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addStore,
  deleteStore,
  stockCalculator,
  revenueCalculator
};
