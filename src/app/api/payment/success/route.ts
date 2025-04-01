import paymentController from "../payment.controller";

export async function GET(req: Request) {
    return paymentController.verifyPidx(req)
}