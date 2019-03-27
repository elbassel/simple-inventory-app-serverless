const ajv = require('ajv');
const Validator = new ajv();
const mongoose = require('mongoose');
// TODO Set DB URL here
const url = 'mongodb+srv://<username>:<password>@cluster0-f79su.mongodb.net/test';
const  ItemModel = require('./models/items');
const { ItemInventoryProcess, ItemService } = require('./services');
const { BaseError } = require('./utils/errors');
const { 
  CREATE_ITEM_SCHEME, 
  OBJECTID_SCHEME,
  QUANTITY_SCHEME,
  ITEM_OPERATION_SCHEME
} = require('./utils/validations/items');

const CONSTANTS = require('./utils/constants');


function genereateError(err) {
  const errorResponse = {};
  if ( err instanceof BaseError) {
    errorResponse.statusCode =  err.httpCode;
    errorResponse.body = JSON.stringify(err.toJson());
  } else {
    errorResponse.statusCode =  500;
    errorResponse.body = 'Something broke!';
  }
  return errorResponse;
}

const listItems = async (event, context) => {
  try {
    mongoose.connect(url, {useNewUrlParser: true});
    const items = await ItemService.getItems();
    console.log(items)
    return {
      statusCode: 200,
      body: JSON.stringify(items)
    };
  } catch(e) {
    console.log(e);
    return genereateError(e);
  }
};

const getItemById = async (event, context) => {
  try {    
      mongoose.connect(url, {useNewUrlParser: true});
      const itemId = event.pathParameters.id
      const item = await ItemService.getItemById(itemId);
      return {
        statusCode: 200,
        body: JSON.stringify(item)
      };
    } catch(e){
      return genereateError(e);
    }
};

const deleteItem = async (event, context) => {
  try {
      Validator.validate(OBJECTID_SCHEME, event.pathParameters);
      mongoose.connect(url, {useNewUrlParser: true});
      const itemId = event.pathParameters.id
      await ItemService.deleteItem(itemId);
      return {
        statusCode: 200,
      };
    } catch(e){
      return genereateError(e);
    }
};

const updateItem = async (event, context) => {
  try {    
      Validator.validate(OBJECTID_SCHEME, event.pathParameters);
      Validator.validate(CREATE_ITEM_SCHEME, event.body);
      mongoose.connect(url, {useNewUrlParser: true});
      const data = JSON.parse(event.body);
      const updatedItem = await ItemService.updateItem(data);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedItem)
      };
    } catch(e){
      return genereateError(e);
    }
};

const createItem = async (event, context) => {
  try {    
      Validator.validate(OBJECTID_SCHEME, event.pathParameters);
      Validator.validate(CREATE_ITEM_SCHEME, event.body);
      mongoose.connect(url, {useNewUrlParser: true});
      const data = JSON.parse(event.body);
      const newItem = await ItemService.addNewItem(data);
      return {
        statusCode: 200,
        body: JSON.stringify(newItem)
      };
    } catch(e){
      return genereateError(e);
    }
};

const itemProcess = async (event, context) => {
  try {
    Validator.validate(OBJECTID_SCHEME, event.pathParameters);
    Validator.validate(QUANTITY_SCHEME, event.body);
    Validator.validate(ITEM_OPERATION_SCHEME,event.queryStringParameters);
    mongoose.connect(url, {useNewUrlParser: true});
    const data = JSON.parse(event.body);
    const itemId = event.pathParameters.id
    switch(event.queryStringParameters[CONSTANTS.ITEM_INVENTORY_OPERATION]) {
      case CONSTANTS.ITEM_INVENTORY_OPERATION_GO_IN: 
          await ItemInventoryProcess.itemGoIn(itemId, data.quantity);
          break;
      case CONSTANTS.ITEM_INVENTORY_OPERATION_COME_OUT:
          await ItemInventoryProcess.itemComeOut(itemId, data.quantity);
          break;
    }
    return {
      statusCode: 200,
    }
  } catch (e) {
    return genereateError(e);
  }
}



module.exports = {
  listItems,
  getItemById,
  deleteItem,
  updateItem,
  createItem,
  itemProcess
};