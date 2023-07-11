import React, { ReactElement, ReactNode } from "react";
import { OverlayTrigger, OverlayTriggerProps, Tooltip } from "react-bootstrap";

interface IProps {
     title: ReactNode;
     children: ReactElement;
}

export default function CommonTooltip({ title, children, ...props }: IProps & Omit<OverlayTriggerProps, "overlay" | "children">) {
     if (!title) {
          return children;
     }

     return (
          <OverlayTrigger placement="top" {...props} overlay={<Tooltip>{title}</Tooltip>}>
               {children}
          </OverlayTrigger>
     );
}