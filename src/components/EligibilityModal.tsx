import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, ArrowRight, X, ChevronRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface EligibilityModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    grantId: string;
    eligibilityCriteria: string[];
}

const EligibilityModal = ({ open, onOpenChange, grantId, eligibilityCriteria }: EligibilityModalProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [isEligible, setIsEligible] = useState<boolean | null>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (open) {
            setCurrentStep(0);
            setAnswers(new Array(eligibilityCriteria.length).fill(null));
            setIsEligible(null);
        }
    }, [open, eligibilityCriteria.length]);

    const handleAnswer = (answer: boolean) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = answer;
        setAnswers(newAnswers);

        if (!answer) {
            // If user answers No, they are ineligible immediately
            setIsEligible(false);
        } else if (currentStep < eligibilityCriteria.length - 1) {
            // Move to next step
            setCurrentStep(prev => prev + 1);
        } else {
            // All steps completed and all answers were Yes
            setIsEligible(true);
        }
    };

    const progress = ((currentStep + (isEligible !== null ? 1 : 0)) / eligibilityCriteria.length) * 100;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-xl sm:max-w-2xl overflow-hidden p-0 gap-0 border-none shadow-2xl">
                {/* Header Section with Progress */}
                <div className="bg-primary/5 p-6 pb-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-secondary/20">
                        <motion.div
                            className="h-full bg-secondary"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                    </div>

                    <DialogHeader className="relative z-10">
                        <DialogTitle className="text-2xl font-bold text-center">Eligibility Check</DialogTitle>
                        <DialogDescription className="text-center text-base mt-2">
                            {isEligible === null
                                ? `Step ${currentStep + 1} of ${eligibilityCriteria.length}`
                                : isEligible
                                    ? "Congratulations!"
                                    : "Not Eligible"}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-10 min-h-[300px] flex flex-col justify-center items-center relative">
                    <AnimatePresence mode="wait">
                        {isEligible === null ? (
                            <motion.div
                                key="question"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="w-full max-w-lg text-center space-y-8"
                            >
                                <h3 className="text-xl sm:text-2xl font-medium leading-relaxed text-foreground">
                                    {eligibilityCriteria[currentStep]}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="h-16 text-lg border-2 hover:border-destructive hover:bg-destructive/5 hover:text-destructive transition-all"
                                        onClick={() => handleAnswer(false)}
                                    >
                                        <X className="mr-2 h-5 w-5" />
                                        No
                                    </Button>
                                    <Button
                                        size="lg"
                                        className="h-16 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                                        onClick={() => handleAnswer(true)}
                                    >
                                        <Check className="mr-2 h-5 w-5" />
                                        Yes
                                    </Button>
                                </div>
                            </motion.div>
                        ) : isEligible ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 max-w-md"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle className="h-10 w-10 text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-green-900">You are eligible!</h3>
                                <p className="text-muted-foreground text-lg">
                                    Great news! You meet all the criteria for this grant. You can proceed with your application now.
                                </p>
                                <div className="pt-6">
                                    <Button asChild size="lg" className="w-full h-12 text-lg shadow-lg">
                                        <Link to={`/apply/${grantId}`}>
                                            Start Application <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="ineligible"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-6 max-w-md"
                            >
                                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="h-10 w-10 text-yellow-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-yellow-900">Not Eligible</h3>
                                <p className="text-muted-foreground text-lg">
                                    Unfortunately, you do not meet the requirement:
                                    <br />
                                    <span className="font-medium text-foreground block mt-2 p-3 bg-muted rounded-md">
                                        "{eligibilityCriteria[currentStep]}"
                                    </span>
                                </p>
                                <div className="pt-6 flex flex-col gap-3">
                                    <Button variant="outline" size="lg" onClick={() => onOpenChange(false)}>
                                        Browse Other Grants
                                    </Button>
                                    <Button variant="ghost" asChild>
                                        <Link to="/contact">Contact Support</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer - Only show back button if in progress */}
                {isEligible === null && currentStep > 0 && (
                    <div className="p-4 border-t bg-muted/20 flex justify-start">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentStep(prev => prev - 1)}
                            className="text-muted-foreground"
                        >
                            Back to previous step
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default EligibilityModal;
