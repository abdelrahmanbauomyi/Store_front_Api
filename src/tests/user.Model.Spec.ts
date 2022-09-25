import { user,user_Options } from "../Models/user.Model";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const {
    BCRYPT_PASSWORD,
    SALT_ROUNDS
} = process.env

const Options = new user_Options()

describe("User Model",()=>{
    it('should have index method',()=>{
        expect(Options.index).toBeDefined();
    });
    it('should have a show method',()=>{
        expect (Options.show).toBeDefined();
    });
    it('should have a create method',()=>{
        expect(Options.create).toBeDefined();
    });

    // it('index should return list of Users',async ()=>{
    //     const res = await Options.index()
    //     expect(res).toEqual([])//empty to check test db migration is working correctly
    // });
    it('create method should add a user ', async () => {
        const result = await Options.create({
            fname:"ahmed",
            lname: "monier",
            password: "password"
        });
        expect(result.id).toEqual(3)
        expect(result.fname).toEqual("ahmed");
        expect(result.lname).toEqual("monier");
      });
      it('check password hashing and the shows function',async ()=>{
        const result = await Options.show("2")
        expect(bcrypt.compareSync("password"+BCRYPT_PASSWORD,result.password)).toBeTruthy()
      })
      
})