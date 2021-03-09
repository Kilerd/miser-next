import AuthenticationLayout from "../../components/AuthenticationLayout";
import {ProtectRoute} from "../../contexts/auth";
import {useRouter} from "next/router";
import {useLedger} from "../../contexts/ledger";

function SingleTransactionPage() {
    const router = useRouter()
    const {id} = router.query
    const ledgerContext = useLedger();
    const targetTransaction = ledgerContext.transactions[id];
    console.log("target transaction", targetTransaction);
    if (targetTransaction === undefined) {
    }
    return (
        <AuthenticationLayout>
            hello single transaction {id}
        </AuthenticationLayout>
    )
}

export default ProtectRoute(SingleTransactionPage)
