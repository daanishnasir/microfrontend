import * as React from "react";
import { SerializedStyles, Theme, useTheme } from "@emotion/react";
import { css } from "@emotion/react";
import type {
  StyleOverride,
  MergeElementProps,
  MergeFirst,
  theme,
} from "@resi-media/resi-ui";
import {
  Text,
  sanitizeProps,
  getStyles,
  mergeDefaultProps,
} from "@resi-media/resi-ui";

const S = {
  container: (
    theme: Theme,
    _props: ContentHeaderInternalProps
  ): SerializedStyles => {
    return css`
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;
      grid-template-areas: "page-header-title" "page-header-cta" "page-header-description";
      row-gap: 2rem;
      padding: ${theme.spacing.xl} ${theme.spacing.xl} 2rem ${theme.spacing.xl};
      ${theme.mq.md} {
        grid-template-areas: "page-header-title page-header-cta" "page-header-description page-header-description";
        grid-template-columns: 1fr auto;
        column-gap: ${theme.spacing.l};
        align-items: center;
      }
      ${theme.mq.lg} {
        column-gap: ${theme.spacing.xl};
      }
    `;
  },
  title: (theme: Theme): SerializedStyles => css`
    grid-area: page-header-title;
    display: flex;
    flex-flow: row nowrap;
    column-gap: 2rem;
    align-items: center;
  `,
};

type CustomCss = {
  container?: StyleOverride<ContentHeaderInternalProps>;
};

const defaultProps = {};

export type ContentHeaderProps = MergeElementProps<
  "div",
  {
    children?: never;
    cta?: React.ReactNode;
    customCss?: CustomCss;
    description?: React.ReactNode | string;
    icon?: React.ReactNode;
    titleNode: React.ReactNode | string;
  }
>;

export type ContentHeaderInternalProps = MergeFirst<
  ContentHeaderProps,
  typeof defaultProps
>;

const ContentHeader: React.FC<ContentHeaderProps> = React.forwardRef<
  HTMLDivElement,
  ContentHeaderProps
>((props: ContentHeaderProps, ref) => {
  const propsInternal: ContentHeaderInternalProps = mergeDefaultProps(
    props,
    defaultProps
  );
  const { children, dataTestId, ...rest } = propsInternal;
  return (
    <header
      ref={ref}
      css={(theme) => [
        S.container(theme, propsInternal),
        getStyles("container", theme, propsInternal),
      ]}
      {...sanitizeProps(rest)}
    >
      <Text as="h3" css={S.title}>
        {props.icon}
        <span>{props.titleNode}</span>
      </Text>
      {props.description && (
        <Text
          as={React.isValidElement(props.description) ? "div" : "p"}
          colorVariant="primary"
          style={{ gridArea: "page-header-description" }}
          variant="body3"
        >
          {props.description}
        </Text>
      )}
      {props.cta && (
        <div style={{ gridArea: "page-header-cta" }}>{props.cta}</div>
      )}
    </header>
  );
});

ContentHeader.displayName = "ContentHeader";

export default ContentHeader;
