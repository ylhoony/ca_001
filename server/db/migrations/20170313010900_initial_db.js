exports.up = function(knex, Promise) {
  return Promise.all([
    // Users Table
    // List of Currencies - No Duplicates
    knex.schema.createTable('currencies', (t) => {
      t.increments('id').primary();
      t.string('currencyName').unique();
      t.string('currencyCode').unique();
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    // List of Countries - Currency can be duplicate
    knex.schema.createTable('countries', (t) => {
      t.increments('id').primary();
      t.string('countryShortName').unique();
      t.string('countryLongName').unique();
      t.string('countryNumericCode').unique();
      t.string('countryIso2').unique();
      t.string('countryIso3').unique();
      t.integer('currencyId')
      t.foreign('currencyId').references('currencies.id');
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    // System Users - Access to Dashboard
    knex.schema.createTable('users', (t) => {
      t.increments('id').primary();
      t.string('email').unique();
      t.string('firstName');
      t.string('lastName');
      t.string('password');
      t.boolean('verifiedEmail');
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    // Client Company List
    knex.schema.createTable('companies', (t) => {
      t.increments('id').primary();
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.integer('defaultCurrencyId')
      t.foreign('defaultCurrencyId').references('currency.id');
      t.bigInteger('createdAt');
      t.bigInteger('updatedAt');
    }),
    // Shows User has access to which companies
    knex.schema.createTable('company_user', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('userId');
      t.foreign('userId').references('users.id');
      t.string('userLevelId');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Set up a nominal Name of Tax Rule
    knex.schema.createTable('taxRules', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('taxRuleName');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Name and Rates of Tax Components that belongs to Tax Rules
    knex.schema.createTable('taxComponents', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('taxRuleId');
      t.foreign('taxRuleId').references('taxRules.id');
      t.string('taxComponentName');
      t.float('taxComponentRate'); // take percentage
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // List of Warehouses
    knex.schema.createTable('warehouses', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('warehouseName');
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Product Types - if the item is Service or Products ??
    knex.schema.createTable('productTypes', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('productTypeName'); // Product or Service
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Product Line / Category - highest level
    knex.schema.createTable('productCategories', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('productCategoryName'); // Product or Service
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Product Groups that belongs to the Product Category
    knex.schema.createTable('productGroups', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('productCategoryId');
      t.foreign('productCategoryId').references('productCategories.id');
      t.string('productGroupsName'); // Product or Service
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Dropship Options for Products
    knex.schema.createTable('dropshipTypes', (t) => {
      t.increments('id').primary();
      t.string('dropshipTypeName'); // Always, Partial, Never
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Products - Need to organize structure
    // such as by Pricing / Inventory / Shipping Box
    // Chart of Account / Supplers / Costing
    knex.schema.createTable('products', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('productTypeId'); // product or service
      t.foreign('productTypeId').references('productTypes.id');
      t.string('sku'); // Unique by company
      t.string('productName');
      t.string('productDescription');
      t.string('productTechDescription'); // Technical Description
      t.float('safetyStock'); // Safety Stock Qty
      t.float('reorderPoint'); // Inventory Alarm
      t.boolean('isActive');
      t.boolean('isNotForSale');
      t.integer('dropshipTypeId'); // product or service
      t.foreign('dropshipTypeId').references('dropshipTypes.id');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Sales Price List that is to be assigned to the customer by default
    // This will be displayed at default when sales order entry area is open
    // or assigned to the Sales Channel for integration
    knex.schema.createTable('salesPriceLevels', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('salesPriceLevelName'); // RRP & WSP should be created at default
      t.boolean('isDefault');
      t.boolean('isActive');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Sales Prices by Products and Price Level
    // How are we going to handle volume pricing?
    knex.schema.createTable('product_salesPriceLevel', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('productId');
      t.foreign('productId').references('products.id');
      t.integer('salesPriceLevelId');
      t.foreign('salesPriceLevelId').references('salesPriceLevels.id');
      t.integer('threshold'); // volume pricing to be applied from this number
      t.float('salesPrice');
      t.boolean('isActive');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Inventory List supplied by different suppliers
    knex.schema.createTable('productInventories', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('productId'); // from Products Table
      t.foreign('productId').references('products.id');
      t.string('vendorSku'); // Vendor's SKU - optional
      t.string('productName'); // can be copied over
      t.string('productDescription'); // can be copied over
      t.string('productTechDescription'); // Technical Description
      t.float('purchaseUnitCost'); // Default Purchase Price
      t.float('inventoryQty'); // Inventory Quantity
      t.float('inventoryTotalValue'); // Inventory Total Value
      t.boolean('isDefalutSupplier'); // If this is main supplier for dropship
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Sales Channel defines how the order was placed or received
    knex.schema.createTable('salesChannels', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('salesChannelName');
      t.boolean('isDefault');
      t.boolean('isActive');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Customer Groups define the customer classification
    // Where the customer is supposed to belong
    // it might not match to the sales channel
    knex.schema.createTable('customerGroups', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.string('customerGroupName');
      t.boolean('isDefault');
      t.boolean('isActive');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Customer/Buyer information
    knex.schema.createTable('customerCompanies', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('customerGroupId');
      t.foreign('customerGroupId').references('customerGroups.id');
      t.integer('salesPriceLevelId');
      t.foreign('salesPriceLevelId').references('salesPriceLevels.id');
      t.integer('accountNumber'); // Assigned by system
      t.string('referenceNumber'); // Manually assigned Id
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.string('website');
      t.integer('defaultCurrencyId');
      t.foreign('defaultCurrencyId').references('currency.id');
      t.string('note');
      t.string('paymentTerms'); // Should add options
      t.string('freightTerms'); // Should add options
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    knex.schema.createTable('customerCompanyAddresses', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('customerCompanyId');
      t.foreign('customerCompanyId').references('customerCompanies.id');
      t.integer('accountNumber'); // Assigned by system
      t.string('referenceNumber'); // Manually assigned Id
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('firstName');
      t.string('lastName');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.string('note');
      t.boolean('isBillingAddress');
      t.boolean('isShippingAddress');
      t.boolean('isDefaultBilling');
      t.boolean('isDefaultShipping');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    knex.schema.createTable('customerCompanyContacts', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('customerCompanyId');
      t.foreign('customerCompanyId').references('customerCompanies.id');
      t.string('firstName');
      t.string('lastName');
      t.string('title');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.string('note');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    // Supplier Information
    knex.schema.createTable('supplierCompanies', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('accountNumber'); // Assigned by system
      t.string('referenceNumber'); // Manually assigned Id
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.string('website');
      t.integer('defaultCurrencyId');
      t.foreign('defaultCurrencyId').references('currency.id');
      t.string('note');
      t.boolean('isCarrier');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    knex.schema.createTable('supplierCompanyAddresses', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('supplierCompanyId');
      t.foreign('supplierCompanyId').references('supplierCompanies.id');
      t.integer('accountNumber'); // Assigned by system
      t.string('referenceNumber'); // Manually assigned Id
      t.string('companyName');
      t.string('companyDba');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('firstName');
      t.string('lastName');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.string('note');
      t.boolean('isBillingAddress');
      t.boolean('isShippingAddress');
      t.boolean('isDefaultBilling');
      t.boolean('isDefaultShipping');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    }),
    knex.schema.createTable('supplierCompanyContacts', (t) => {
      t.increments('id').primary();
      t.integer('companyId');
      t.foreign('companyId').references('companies.id');
      t.integer('supplierCompanyId');
      t.foreign('supplierCompanyId').references('supplierCompanies.id');
      t.string('firstName');
      t.string('lastName');
      t.string('title');
      t.string('address1');
      t.string('address2');
      t.string('city');
      t.string('state');
      t.integer('countryId');
      t.foreign('countryId').references('country.id');
      t.string('phone');
      t.string('fax');
      t.string('email');
      t.string('note');
      t.bigInteger('created_at');
      t.bigInteger('updated_at');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([




    knex.schema.dropTable('users')
  ])
};
