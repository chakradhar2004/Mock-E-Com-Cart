'use client';

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { placeOrderAction } from "@/lib/actions";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full" size="lg">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Place Order
        </Button>
    )
}

export function CheckoutForm() {
    const [state, formAction] = useFormState(placeOrderAction, null);
    const { toast } = useToast();

    useEffect(() => {
        if(state?.error) {
            toast({ title: 'Error', description: state.error, variant: 'destructive' })
        }
    }, [state, toast]);

    return (
        <form action={formAction}>
            <Card>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" placeholder="John Doe" required/>
                         {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name.join(', ')}</p>}
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" placeholder="john.doe@example.com" required/>
                        {state?.errors?.email && <p className="text-sm text-destructive">{state.errors.email.join(', ')}</p>}
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
            </Card>
        </form>
    )
}
