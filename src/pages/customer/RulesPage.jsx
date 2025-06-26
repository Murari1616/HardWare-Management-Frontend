//@ts-nocheck
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const RulesPage = () => {
    const navigate=useNavigate();
    const [agreed, setAgreed] = useState(false);

    const rules = [
        {
            en: "1. Return the rented item on time.",
            te: "1. అద్దెకు తీసుకున్న వస్తువును సమయానికి తిరిగి ఇవ్వాలి.",
        },
        {
            en: "2. Handle the item carefully.",
            te: "2. వస్తువును జాగ్రత్తగా ఉపయోగించాలి.",
        },
        {
            en: "3. In case of damage, charges may apply.",
            te: "3. వస్తువు దెబ్బతిన్నట్లయితే, అదనపు ఖర్చు వసూలు చేయబడుతుంది.",
        },
        {
            en: "4. Provide a valid ID proof if required.",
            te: "4. అవసరమైన సందర్భాలలో చెల్లుబాటు అయ్యే గుర్తింపు కార్డును ఇవ్వాలి.",
        },
        {
            en: "5. If an item is taken at any time of the day (morning, afternoon, or evening), it must be returned by the same night. If the item is returned the next morning, it will be counted as the second day of rental.",
            te: "5. ఏ సమయంలో అయినా (ఉదయం, మధ్యాహ్నం లేదా సాయంత్రం) వస్తువును తీసుకుంటే అదే రాత్రి వరకు తిరిగి ఇవ్వాలి. వస్తువును వచ్చే రోజు ఉదయం తిరిగి ఇస్తే రెండవ రోజు అద్దెగా పరిగణించబడుతుంది.",
        },
        {
            en: "6. Delivery charges will vary depending on the item.",
            te: "6. ప్రతి వస్తువు కోసం డెలివరీ ఛార్జీలు వేర్వేరుగా ఉంటాయి.",
        }
    ];



    const handleCheckboxChange = (e) => {
        setAgreed(e.target.checked);
    };

    const handleButtonClick = () => {
        navigate('/app/rent-creation')
        // You can perform further actions here, like navigating to another page.
    };

    return (
        <div className="flex justify-center mx-4">
        <div className="max-w-2xl  p-6 bg-white shadow  rounded-xl mt-6">
            <h2 className="text-2xl font-bold flex w-full mb-4 justify-center">Rules & Regulations / నిబంధనలు</h2>

            <div className=" overflow-y-auto pr-2 mb-4">
                {rules.map((rule, index) => (
                    <div key={index} className="mb-3">
                        <p className="text-base font-medium">{rule.en}</p>
                        <p className="text-base text-gray-700">{rule.te}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center mb-4">
                <input
                    type="checkbox"
                    id="agreeCheckbox"
                    checked={agreed}
                    onChange={handleCheckboxChange}
                    className="mr-2 w-4 h-4"
                />
                <Label htmlFor="agreeCheckbox">I agree to the above rules / నేను పై నిబంధనలను అంగీకరిస్తున్నాను</Label>
            </div>

            <Button
                type="button"
                onClick={handleButtonClick}
                disabled={!agreed}
                variant={agreed ? "default" : "outline"}
                className={`w-full ${!agreed ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                Proceed / కొనసాగించండి
            </Button>
        </div>
        </div>
    );
};

export default RulesPage;
