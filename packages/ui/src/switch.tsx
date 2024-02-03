import * as React from "react";

interface SwitchProps {
  value: any;
  children: React.ReactNode;
}

interface CaseProps {
  value: any;
  children: React.ReactNode;
}

interface DefaultProps {
  children: React.ReactNode;
}

const Switch = ({ value, children }: SwitchProps) => {
  let defaultCase: React.ReactNode = null;
  const cases = React.Children.toArray(children);

  const caseElements = cases.map((caseElement) => {
    if (React.isValidElement<CaseProps>(caseElement)) {
      const { value: caseValue, children: caseChildren } = caseElement.props;
      if (caseValue === value) {
        return caseChildren;
      }
    } else if (React.isValidElement<DefaultProps>(caseElement)) {
      defaultCase = caseElement.props.children;
    }
    return null;
  });

  const selectedCase = caseElements.find((caseResult) => caseResult !== null);

  return selectedCase || defaultCase || null;
};

const Case = ({ children }: CaseProps) => <>{children}</>;

const Default = ({ children }: DefaultProps) => <>{children}</>;

export { Switch, Case, Default };
