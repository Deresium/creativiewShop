import ApplicationRouter from "./ApplicationRouter";
import IBasketRequester from "../../business/requesters/IBasketRequester";
import {RequestHandler} from "express";
import PDFDocument from "pdfkit"
import path from "path";
import IInternalizationRequester from "../../business/requesters/IInternalizationRequester";

export default class OrderPdfRouter extends ApplicationRouter {
    private readonly basketRequester: IBasketRequester;
    private readonly internalizationRequester: IInternalizationRequester;
    private readonly checkBasketAccessMiddleware: RequestHandler;


    constructor(basketRequester: IBasketRequester, internalizationRequester: IInternalizationRequester, checkBasketAccessMiddleware: RequestHandler) {
        super();
        this.basketRequester = basketRequester;
        this.internalizationRequester = internalizationRequester;
        this.checkBasketAccessMiddleware = checkBasketAccessMiddleware;
        this.initRoutes()
    }

    public initRoutes() {
        this.getRouter().get('/order/:basketId/pdf', this.checkBasketAccessMiddleware, async (req: any, res: any, next: any) => {
            try {
                const basketId = String(req.params.basketId);
                const customer = req.customer;
                const language = req.query.language;
                const order = await this.basketRequester.getBasketOrder(basketId, customer, language);
                const messages = await this.internalizationRequester.getInternalizationMessagesForCustomerInOneLanguage(customer.getCustomerId(), language);
                if (!order) {
                    res.send();
                    return;
                }

                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-disposition', `attachment;filename=${messages.get('order')}_${order.getOrderNumber()}.pdf`);
                const doc = new PDFDocument();
                doc.pipe(res);
                let y = 50;
                const x = 50;
                doc.image(path.join(__dirname, `../../../public/logos/${2}.png`), x, y, {
                    fit: [100, 100],
                });
                y += 50;
                doc.fontSize(12);
                doc.text(`${messages.get('name')}: ${order.getFirstName()} ${order.getName()}`, x, y);
                y += 30;
                if (order.getEmail()) {
                    doc.text(`${messages.get('email')}: ${order.getEmail()}`, x, y);
                    y += 30;
                }
                if (order.getPhoneNumber()) {
                    doc.text(`${messages.get('phone')}: ${order.getPhoneNumber()}`, x, y);
                    y += 30;
                }
                doc.fontSize(25);
                doc.text(messages.get('productList'), x, y);
                doc.fontSize(12);
                y += 50;

                for (const productOptionBasket of order.getBasketProductOptionOrders()) {
                    doc.text(`${messages.get('name')}: ${productOptionBasket.getTitle()}`, x, y);
                    y += 30;
                    doc.text(`${messages.get('quantity')}: ${productOptionBasket.getQuantity()}`, x, y);
                    y += 30;
                    doc.text(`${messages.get('price')}: ${productOptionBasket.getPrice()} ${order.getCurrencySymbol()}`, x, y);
                    y += 30;
                    doc.text(`${messages.get('total')}: ${productOptionBasket.getTotal()} ${order.getCurrencySymbol()}`, x, y);
                    y += 50;
                    if (y >= 500) {
                        doc.addPage();
                        y = 50;
                    }
                }
                y += 50;
                doc.fontSize(13);
                doc.text(`${messages.get('deliveryOptionPrice')}: ${order.getDeliveryPrice()} ${order.getCurrencySymbol()}`, x, y);
                y += 50;
                doc.text(`${messages.get('total')}: ${order.getTotalPrice()} ${order.getCurrencySymbol()}`, x, y);
                doc.end();
            } catch (error) {
                next(error);
            }
        });
    }
}