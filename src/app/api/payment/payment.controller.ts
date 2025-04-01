import sequelize from "@/database/connection"
import Payment from "@/database/models/Payment"
import axios from "axios"



class paymentController {


    async verifyPidx(req: Request) {
        try {
            await sequelize
            const { searchParams } = new URL(req.url)
            // console.log(searchParams,"SEARCH TEST TEST")
            const pidx = searchParams.get('pidx')
            const response = await axios.post("https://dev.khalti.com/api/v2/epayment/lookup/", { pidx }, {
                headers: {
                    Authorization: "Key 23969b194dec40ea957208808bb42996"

                }
            })
            if (response.data.status === "Completed") {
                //database ma modification
                await Payment.update({status:"Paid"},{
                    where:{
                        pidx
                    }
                })
                // notify to frontend
                return Response.redirect("http://localhost:3000")
            } else {
                // notify to frontend
                return Response.redirect("http://localhost:3000/errorPage")
            }



        } catch (error) {
            console.log(error)
            return Response.json({
                message: "Something went wrong"
            }, { status: 500 })
        }
    }

}

export default new paymentController