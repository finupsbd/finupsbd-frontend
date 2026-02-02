

import ArrangementLetter from "@/components/pdf/components/ArrangementLetter"
import { getAgrementDoc } from "@/services/applications/userApplication";
import { TAgreementDoc } from "@/types/applications";
import { notFound } from "next/navigation";


const DownloadAgrementCopy = async (props: { params: Promise<{ id: string }> }) => {
    const { id } = await props.params
    let appData: TAgreementDoc | null = null;

    try {
        const res = await getAgrementDoc(id);
        appData = res?.data as TAgreementDoc ?? null;
    } catch (err) {
        console.error("get agreement data faild failed:", err);
    }

    console.log(appData)
    if (!appData) {
        notFound();
    }


    return (
        <div>
            <ArrangementLetter applicationData={appData} />
        </div>
    )
}

export default DownloadAgrementCopy


