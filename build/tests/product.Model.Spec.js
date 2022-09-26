"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_Model_1 = require("../Models/product.Model");
const Options = new product_Model_1.product_Options();
describe('Product Model', () => {
    it('should have index method', () => {
        expect(Options.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(Options.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(Options.create).toBeDefined();
    });
    it('should have a category method', () => {
        expect(Options.index_By_Category).toBeDefined();
    });
    // it('index should return list of products',async ()=>{
    //     const res = await Options.index()
    //     expect(res).toEqual([])//empty to check test db migration is working correctly
    // });
    it('create method should add a user and the Password hashing is working', async () => {
        const result = await Options.create({
            name: 'prod1',
            category: 'vediogame',
            price: 52.3,
        });
        expect(result.name).toEqual('prod1');
        expect(result.price.toString()).toEqual('52.3000');
        expect(result.category).toEqual('vediogame');
    });
    it('show by category is working correctly', async () => {
        const result = await Options.index_By_Category('vediogame');
        expect(result[0].name).toEqual('prod1');
        expect(result[0].price.toString()).toEqual('52.3000'); //due to the decimal Precision in the sql queries in the up migration
    });
    it('show working correctly', async () => {
        const result = await Options.show('2');
        expect(result.name).toEqual('prod1');
        expect(result.price.toString()).toEqual('52.3000'); //due to the decimal Precision in the sql queries in the up migration
    });
});
