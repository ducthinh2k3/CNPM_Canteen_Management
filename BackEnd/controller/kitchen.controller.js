const ProductKitchen = require('../models/kitchen.model')
exports.GetKitchenPageNotComplete = async (req, res, next) => {
    try {
        const result = await ProductKitchen.GetListProductNotComplete();
        res.json(result)
    } catch (error) {
        next(error);
    }
}
exports.GetKitchenPageComplete = async (req, res, next) => {
    try {
        const result = await ProductKitchen.GetListProductComplete();
        res.json(result)
    } catch (error) {
        next(error);
    }
}
exports.notifyKitchenPageComplete = async (req, res, next) => {

    try {
        const entity = {
            STT: req.query.STT,
            MaSP: req.query.MaSP,
            TrangThai: true,
        }
        const rs = await ProductKitchen.notifyKitchenPageComplete(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html')
    } catch (error) {
        next(error);
    }
}
exports.notifyKitchenPageNotComplete = async (req, res, next) => {
    console.log(req.query);
    try {
        const entity = {
            STT: req.query.STT,
            MaSP: req.query.MaSP,
            TrangThai: false,
        }
        const rs = await ProductKitchen.notifyKitchenPageNotComplete(entity);
        res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html')
    } catch (error) {
        next(error);
    }
}
exports.notifySoldOut = async (req, res, next) => {
    try {
        const entity = {
            MaSP: req.body.MaSP,
            TenSP: req.body.TenSP,
            TrangThai: false
        }
        const rs = await ProductKitchen.notifySoldOut(entity);
        if (rs) {
            const Message = 'Notify success!';
            res.send(`
                    <script>
                        alert("${Message}");
                        window.location.href = "http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html"; // Chuyển hướng đến trang chính hoặc trang khác
                    </script>
                `);
        }
        else {
            const Message = 'Notify no success!';
            res.send(`
                    <script>
                        alert("${Message}");
                        window.location.href = "http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html"; // Chuyển hướng đến trang chính hoặc trang khác
                    </script>
                `);
        }

        //res.redirect('http://127.0.0.1:5500/FrontEnd/Shop/Kitchen.html');
    } catch (error) {
        console.log(error);
    }
}