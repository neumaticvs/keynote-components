import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Brain, Lightbulb, Users, ArrowRight, Sparkles } from 'lucide-react';

interface EventFormData {
  eventName: string;
  mainTopic: string;
  additionalInfo: string;
  numberOfPanels: number;
}

interface EventCreatorProps {
  onSubmit?: (data: EventFormData) => void;
  isLoading?: boolean;
}

const EventCreator: React.FC<EventCreatorProps> = ({ 
  onSubmit = () => {},
  isLoading = false 
}) => {
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    mainTopic: '',
    additionalInfo: '',
    numberOfPanels: 3
  });

  const [errors, setErrors] = useState<Partial<EventFormData>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (field: keyof EventFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<EventFormData> = {};
    
    if (!formData.eventName.trim()) {
      newErrors.eventName = 'Event name is required';
    }
    
    if (!formData.mainTopic.trim()) {
      newErrors.mainTopic = 'Main topic is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsGenerating(true);
      // Simulate AI processing time
      setTimeout(() => {
        onSubmit(formData);
        setIsGenerating(false);
      }, 3000); // 3 seconds for demo, replace with actual API call
    }
  };

  const isFormValid = formData.eventName.trim() && formData.mainTopic.trim();

  // Loading screen component
  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-border shadow-lg">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
                <Brain className="absolute inset-0 m-auto h-6 w-6 text-primary" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Generating Ideas</h3>
                <p className="text-muted-foreground">
                  Our AI is analyzing your event requirements and researching topics and speakers...
                </p>
              </div>

              <div className="w-full space-y-2">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full animate-pulse" style={{width: '60%'}}></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  This may take up to 1 minute
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold text-foreground">Keynote Gen.</h1>
          </div>

        </div>

        {/* Main Form Card */}
        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">Create New Event</CardTitle>
            </div>
            <CardDescription className="text-base">
              Provide the basic information about your event and let our AI help you brainstorm topics and speakers
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Name */}
              <div className="space-y-2">
                <Label htmlFor="eventName" className="text-base font-medium flex items-center gap-2">
                  Event Name
                </Label>
                <Input
                  id="eventName"
                  placeholder="e.g., Annual Innovation Summit 2025"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange('eventName', e.target.value)}
                  className={`text-base ${errors.eventName ? 'border-destructive' : ''}`}
                />
                {errors.eventName && (
                  <p className="text-sm text-destructive">{errors.eventName}</p>
                )}
              </div>

              {/* Main Topic */}
              <div className="space-y-2">
                <Label htmlFor="mainTopic" className="text-base font-medium flex items-center gap-2">
                  Main Topic
                </Label>
                <Input
                  id="mainTopic"
                  placeholder="e.g., Brazil Economy 2025, AI in Healthcare, Sustainable Energy Solutions"
                  value={formData.mainTopic}
                  onChange={(e) => handleInputChange('mainTopic', e.target.value)}
                  className={`text-base ${errors.mainTopic ? 'border-destructive' : ''}`}
                />
                {errors.mainTopic && (
                  <p className="text-sm text-destructive">{errors.mainTopic}</p>
                )}
              </div>

              <Separator />

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-base font-medium">
                  Additional Context & Objectives
                </Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Describe the goals, target audience, key discussion points, or any specific focus areas for your event. This helps our AI provide more relevant suggestions."
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  className="min-h-[120px] text-base resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  Optional: Provide context to help AI generate more targeted suggestions
                </p>
              </div>

              {/* Number of Panels */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  Number of Panels: {formData.numberOfPanels}
                </Label>
                <div className="space-y-3">
                  <Slider
                    value={[formData.numberOfPanels]}
                    onValueChange={(value) => handleInputChange('numberOfPanels', value[0])}
                    min={1}
                    max={8}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground">
                    How many panel discussions will your event include? (1-8)
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={!isFormValid || isLoading || isGenerating}
                  className="w-full text-base font-medium bg-[#1B47E2] hover:bg-[#1B47E2]/90"
                >
                  {isLoading || isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      Generate
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default EventCreator;
