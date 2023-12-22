import { useEffect, useState } from "react";
import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import {
  Button,
  Input,
  FormGroup,
  Label,
  Typography,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Case,
  Default,
  Switch,
} from "@unidocs/ui";
import { useConfirm, useLoading } from "@/contexts";
import { SwitchTheme } from "@/components";
import {
  useContractWrite,
  useContractRead,
  useTransactor,
  useToast,
} from "@/hooks";

const Index = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [text, setText] = useState("");

  const { data, isFetched: contractIsFetched } = useContractRead(
    "Greeter",
    "greet"
  );
  const { writeAsync } = useContractWrite("Greeter", "setGreeting");
  const { isConnected } = useAccount();
  const { toast } = useToast();
  const { start, finish } = useLoading({
    message: "Confirm Transaction",
  });
  const confirm = useConfirm();
  const writeTx = useTransactor({
    onError: (err) => {
      toast("error", err);
    },
    onSuccess: () => {
      toast("success", "Transaction completed successfully");
    },
    onFinish: () => {
      finish();
    },
  });

  const handleTx = () =>
    confirm({
      title: "Are you sure?",
      message: "Are you sure you want to do this?",
      onConfirm: async () => {
        start();
        await writeTx(() => {
          const result = writeAsync({
            args: [text],
          });
          setText("");
          return result;
        });
      },
    });

  useEffect(() => setIsFetched(contractIsFetched), [contractIsFetched]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-end w-full space-x-2 py-4 px-2">
        <SwitchTheme />
        <Web3Button />
      </div>

      <div className="w-1/3">
        <Card>
          <CardHeader>
            <Typography as="h2" className="text-center">
              <Switch value={isFetched}>
                <Case value={true}>{data}</Case>
                <Default>loading...</Default>
              </Switch>
            </Typography>
          </CardHeader>
          <CardContent className="space-x-2">
            <div className="grid w-full items-center gap-4">
              <FormGroup>
                <Label>Greeting</Label>
                <Input
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                />
              </FormGroup>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleTx} disabled={!isConnected || !text}>
              Send
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
