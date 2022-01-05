import React from "react";
import { Link } from "react-router-dom";
import crypto from "crypto";

const ALGORITHM = 'aes-256-cbc';
const CIPHER_KEY = "abcdefghijklmnopqrstuvwxyz012345";  // Same key used in Golang
const BLOCK_SIZE = 16;

interface IState {
    password: string;
}

class Welcome extends React.Component<{}, IState>{
    constructor(props: any) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            password: ""
        }
    }

    handleChange(e: any) {
        this.setState({password: e.target.value});
        console.log("Set Value: ", this.state.password);
        const encryptPassword = this.encrypt(this.state.password);
        this.decrypt(encryptPassword || "");
        this.changePassword(encryptPassword || "")
    }

    changePassword(password: string) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password })
        };
        fetch('http://localhost:3005/password', requestOptions)
            .then(response => response.json())
            .then(data => console.log("Response: ", data));
    }

    // Decrypts cipher text into plain text
    decrypt(cipherText: string) {
        const contents = Buffer.from(cipherText, 'hex');
        const iv = contents.slice(0, BLOCK_SIZE);
        const textBytes = contents.slice(BLOCK_SIZE);

        const decipher: any = crypto.createDecipheriv(ALGORITHM, CIPHER_KEY, iv);
        let decrypted = decipher.update(textBytes, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    // Encrypts plain text into cipher text
    encrypt(plainText: string) {
        const iv = crypto.randomBytes(BLOCK_SIZE);
        const cipher = crypto.createCipheriv(ALGORITHM, CIPHER_KEY, iv);
        let cipherText;
        try {
            cipherText = cipher.update(plainText, 'utf8', 'hex');
            cipherText += cipher.final('hex');
            cipherText = iv.toString('hex') + cipherText
        } catch (e) {
            cipherText = null;
        }
        return cipherText;
    }

    render() {
        return (
            <div className="min-h-screen sm:w-full p-2 flex flex-col justify-center items-center w-350 h-550">
                <div className="mb-2">
                    <h1 className="text-3xl font-bold text-white">Welcome</h1>
                </div>
                <div className="m-1 sm:w-2/4 w-full p-2">
                    {/*bg-indigo-500 hover:bg-indigo-600 focus:bg-indigo-600*/}
                    {/*bg-indigo-800 hover:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring focus:ring-indigo-500*/}
                    <Link to={"/import-wallet"}>
                        <button className="text-lg font-bold w-full px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
                            Import account
                        </button>
                    </Link>
                </div>
                <div className="m-1 sm:w-2/4 w-full p-2">
                    <Link to={"/create-wallet"}>
                        <button className="text-lg font-bold w-full px-3 py-3 text-white rounded-lg bg-indigo-800 hover:bg-indigo-700">
                            Create account
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Welcome;
