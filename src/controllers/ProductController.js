const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const ccpPath = path.resolve(__dirname, '../github.com/fabric-samples/test-network/organizations/peerOrganizations/org1.example.com/', 'connection-org1.json');
const walletPath = path.join(process.cwd(), '/src/wallet');

async function connectToNetwork() {
    console.log(walletPath)
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    const gateway = new Gateway();
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    await gateway.connect(ccp, {
        wallet,
        identity: 'admin',
        discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork('mychannel');
    const contract = network.getContract('basic');

    return contract;
}

exports.createProduct = async (req, res) => {
    try {
        const contract = await connectToNetwork();
        const result = await contract.submitTransaction('CreateProduct', req.body.id, req.body.name, req.body.quantity, req.body.owner, req.body.price);
        res.status(201).json({ message: 'Produto criado com sucesso!', product: JSON.parse(result) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const contract = await connectToNetwork();
        const result = await contract.evaluateTransaction('ReadProduct', req.params.id);
        res.status(200).json(JSON.parse(result));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const contract = await connectToNetwork();
        await contract.submitTransaction('UpdateProduct', req.params.id, req.body.name, req.body.quantity, req.body.owner, req.body.price);
        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const contract = await connectToNetwork();
        await contract.submitTransaction('DeleteProduct', req.params.id);
        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const contract = await connectToNetwork();
        const result = await contract.evaluateTransaction('GetAllProducts');
        res.status(200).json(JSON.parse(result));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
