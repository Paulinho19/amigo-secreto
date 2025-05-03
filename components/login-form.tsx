"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { login, LoginState } from "@/app/(auth)/login/actions";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Loader, MessageCircle } from "lucide-react";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    {
      success: null,
      message: "",
    }
  );

  return (
    <Card className="mx-auto min-w-sm bg-foreground">
      <CardHeader>
        <CardTitle className="text-2xl text-white">Login</CardTitle>
        <CardDescription className="text-[15px]">
          Digite seu email para receber o link de login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>

            <Input
              className="text-background"
              name="email"
              id="email"
              type="email"
              placeholder="Digite seu email"
              required
            />
            {state.success === true && (
              <Alert>
                <AlertTitle className="text-gray-700 ">
                  Email Enviado!
                </AlertTitle>
                <MessageCircle className="!text-green-600 " />

                <AlertDescription className="text-gray-800 font-mono text-[15px]">
                  Acesse sua caixa de entrada.
                </AlertDescription>
              </Alert>
            )}

            {state.success === false && (
              <Alert className="text-muted-foreground">
                <AlertTitle className="text-gray-700 ">Erro!</AlertTitle>
                <MessageCircle className="h-4 w-4 !text-red-600" />

                <AlertDescription className="text-gray-800 font-mono text-[15px]">
                  Preencha um email válido.
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-ful cursor-pointer">
              {pending && <Loader className="animate-spin" />}
              Enviar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
