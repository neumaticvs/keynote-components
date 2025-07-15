import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RefreshCw, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PanelTopic {
  id: string;
  panelNumber: number;
  suggestedTopic: string;
  justification: string;
  isConfirmed: boolean;
  isRegenerating: boolean;
}

interface EventPanelTopicsProps {
  eventTitle?: string;
  panels?: PanelTopic[];
  onTopicConfirm?: (panelId: string) => void;
  onTopicRegenerate?: (panelId: string) => void;
  onNextStep?: () => void;
  className?: string;
}

const defaultPanels: PanelTopic[] = [
  {
    id: "panel-1",
    panelNumber: 1,
    suggestedTopic: "The Future of Artificial Intelligence in Healthcare",
    justification: "This topic is highly relevant as AI is revolutionizing healthcare through diagnostic tools, personalized medicine, and treatment optimization. It addresses current industry trends and provides actionable insights for healthcare professionals attending the event.",
    isConfirmed: false,
    isRegenerating: false,
  },
  {
    id: "panel-2",
    panelNumber: 2,
    suggestedTopic: "Sustainable Technology Solutions for Climate Change",
    justification: "Climate technology is a critical discussion point for modern businesses. This panel would explore innovative solutions, green technologies, and sustainable practices that companies can implement to reduce their environmental impact while maintaining profitability.",
    isConfirmed: false,
    isRegenerating: false,
  },
  {
    id: "panel-3",
    panelNumber: 3,
    suggestedTopic: "Digital Transformation and the Future of Work",
    justification: "With remote work and digital tools becoming standard, this topic addresses how organizations can adapt their workflows, culture, and technology stack. It's particularly relevant for executives and HR professionals looking to optimize their digital strategies.",
    isConfirmed: false,
    isRegenerating: false,
  },
];

const LoadingDots = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75"></div>
    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150"></div>
  </div>
);

const EventPanelTopics: React.FC<EventPanelTopicsProps> = ({
  eventTitle = "Tech Innovation Summit 2024",
  panels = defaultPanels,
  onTopicConfirm,
  onTopicRegenerate,
  onNextStep,
  className = "",
}) => {
  const [panelStates, setPanelStates] = useState<PanelTopic[]>(panels);

  const handleConfirm = (panelId: string) => {
    setPanelStates(prev =>
      prev.map(panel =>
        panel.id === panelId ? { ...panel, isConfirmed: true } : panel
      )
    );
    onTopicConfirm?.(panelId);
  };

  const handleRegenerate = async (panelId: string) => {
    setPanelStates(prev =>
      prev.map(panel =>
        panel.id === panelId ? { ...panel, isRegenerating: true } : panel
      )
    );

    // Simulate AI regeneration delay
    setTimeout(() => {
      const newTopics = [
        "Blockchain Applications in Modern Business",
        "Cybersecurity in the Age of Remote Work",
        "The Ethics of AI and Machine Learning",
        "Quantum Computing: Practical Applications",
        "IoT and Smart City Development",
        "Virtual Reality in Education and Training",
      ];
      
      const newJustifications = [
        "This emerging technology offers significant opportunities for business transformation and operational efficiency.",
        "A critical topic addressing the growing security challenges faced by organizations in today's digital landscape.",
        "An essential discussion about responsible AI development and implementation in various industries.",
        "Exploring the practical implications of quantum technology for businesses and research institutions.",
        "Examining how connected devices are reshaping urban infrastructure and citizen services.",
        "Investigating immersive technologies that are revolutionizing learning and professional development.",
      ];

      const randomIndex = Math.floor(Math.random() * newTopics.length);
      
      setPanelStates(prev =>
        prev.map(panel =>
          panel.id === panelId
            ? {
                ...panel,
                suggestedTopic: newTopics[randomIndex],
                justification: newJustifications[randomIndex],
                isRegenerating: false,
                isConfirmed: false,
              }
            : panel
        )
      );
    }, 2000);

    onTopicRegenerate?.(panelId);
  };

  const allConfirmed = panelStates.every(panel => panel.isConfirmed);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 space-y-6 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Sugestões de Painéis
        </h1>
      </motion.div>

      {/* Panel Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {panelStates.map((panel) => (
          <motion.div key={panel.id} variants={cardVariants}>
            <Card className={`transition-all duration-300 ${
              panel.isConfirmed 
                ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/20' 
                : 'hover:shadow-md'
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold flex items-center space-x-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      Panel {panel.panelNumber}
                    </span>
                    {panel.isConfirmed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        <Check className="w-5 h-5 text-green-600" />
                      </motion.div>
                    )}
                  </CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">
                      Suggested Topic:
                    </h3>
                    <AnimatePresence mode="wait">
                      {panel.isRegenerating ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center space-x-3 py-2"
                        >
                          <Loader2 className="w-5 h-5 animate-spin text-primary" />
                          <span className="text-muted-foreground">
                            AI is generating a new topic...
                          </span>
                          <LoadingDots />
                        </motion.div>
                      ) : (
                        <motion.p
                          key={panel.suggestedTopic}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-lg font-semibold text-foreground"
                        >
                          "{panel.suggestedTopic}"
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {!panel.isRegenerating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4 className="font-medium text-sm text-muted-foreground mb-2">
                        Justification:
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {panel.justification}
                      </p>
                    </motion.div>
                  )}
                </div>

                {!panel.isRegenerating && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex space-x-3 pt-2"
                  >
                    {!panel.isConfirmed ? (
                      <>
                        <Button
                          onClick={() => handleConfirm(panel.id)}
                          className="flex items-center space-x-2"
                          size="sm"
                        >
                          <Check className="w-4 h-4" />
                          <span>Confirm</span>
                        </Button>
                        <Button
                          onClick={() => handleRegenerate(panel.id)}
                          variant="outline"
                          className="flex items-center space-x-2"
                          size="sm"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Regenerate</span>
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Topic Confirmed</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Next Step Button */}
      <AnimatePresence>
        {allConfirmed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex justify-center pt-6"
          >
            <Button
              onClick={onNextStep}
              size="lg"
              className="flex items-center space-x-2 px-8 py-3"
            >
              <span>Proceed to Next Step</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center pt-4"
      >
        <div className="text-sm text-muted-foreground">
          {panelStates.filter(p => p.isConfirmed).length} of {panelStates.length} topics confirmed
        </div>
      </motion.div>
    </div>
  );
};

export default function Demo() {
  const handleTopicConfirm = (panelId: string) => {
    console.log("Topic confirmed for panel:", panelId);
  };

  const handleTopicRegenerate = (panelId: string) => {
    console.log("Regenerating topic for panel:", panelId);
  };

  const handleNextStep = () => {
    console.log("Proceeding to next step");
    alert("All topics confirmed! Proceeding to the next step...");
  };

  return (
    <div className="min-h-screen bg-background">
      <EventPanelTopics
        eventTitle="Tech Innovation Summit 2024"
        onTopicConfirm={handleTopicConfirm}
        onTopicRegenerate={handleTopicRegenerate}
        onNextStep={handleNextStep}
      />
    </div>
  );
}
