import { order_Options } from '../Models/order.Model';
const Options = new order_Options();

describe('Order Model', () => {
  it('should have index method', () => {
    expect(Options.index).toBeDefined();
  });
  it('should have a create_order method', () => {
    expect(Options.create_order).toBeDefined();
  });
  it('should have a Order_details method', () => {
    expect(Options.Order_details).toBeDefined();
  });

  it('should have a add_Product_to_Order method', () => {
    expect(Options.add_Product_to_Order).toBeDefined();
  });
  it('should have a current_Order_By_User method', () => {
    expect(Options.current_Order_By_User).toBeDefined();
  });
  it('Order_details working correctly', async () => {
    const result = await Options.Order_details(1);
    expect(result[0].order_id.toString()).toEqual('1');
    expect(result[0].product_id.toString()).toEqual('1');
    expect(result[0].quantity).toEqual(5);
  });
  it('current_Order_By_User working correctly', async () => {
    const result = await Options.current_Order_By_User('1');
    expect(result[0].id).toEqual(1);
    expect(result[0].users_id.toString()).toEqual('1');
    expect(result[0].status_of_order).toEqual('Active');
  });
});
