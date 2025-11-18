import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface EligibilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    grantId: string;
    eligibilityCriteria: string[];
}

const EligibilityModal = ({ open, onOpenChange, grantId, eligibilityCriteria }: EligibilityModalProps) => {
    const [checks, setChecks] = useState<Record<number, boolean>>({});

    const allChecked = eligibilityCriteria.every((_, index) => checks[index] === true);

    const handleCheck = (index: number, value: boolean) => {
        setChecks(prev => ({ ...prev, [index]: value }));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Check Your Eligibility</DialogTitle>
                    <DialogDescription>
                        Please confirm that you meet all the eligibility requirements before applying. This helps ensure you don't pay the application fee if you're not eligible.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {eligibilityCriteria.map((criterion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Checkbox
                                id={`criterion-${index}`}
                                checked={checks[index] || false}
                                onCheckedChange={(value) => handleCheck(index, Boolean(value))}
                            />
                            <Label htmlFor={`criterion-${index}`} className="text-sm leading-relaxed cursor-pointer">
                                {criterion}
                            </Label>
                        </div>
                    ))}
                </div>

                {Object.keys(checks).length > 0 && (
                    <div className={`p-4 rounded-lg border ${allChecked ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
                        <div className="flex items-start gap-3">
                            {allChecked ? (
                                <>
                                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-green-900">You appear eligible!</p>
                                        <p className="text-sm text-green-700 mt-1">
                                            You meet all the eligibility criteria. You can proceed with your application.
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-yellow-900">Not all criteria met</p>
                                        <p className="text-sm text-yellow-700 mt-1">
                                            Based on your answers, you may not be eligible. If you believe this is an error, contact our support team before applying.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    {allChecked ? (
                        <Button asChild>
                            <Link to={`/apply/${grantId}`}>Start Application</Link>
                        </Button>
                    ) : (
                        <Button variant="secondary" asChild>
                            <Link to="/contact">Contact Support</Link>
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EligibilityModal;
