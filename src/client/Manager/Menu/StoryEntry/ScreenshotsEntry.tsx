import React from 'react';
import {
  ScreenshotComparisonResult,
  SuccessTestResult,
} from '../../behaviour/useTestResults/types';
import styled from 'styled-components';
import { blue } from '@ant-design/colors';
import { FileImageOutlined } from '@ant-design/icons';
import { Fail, Fresh, Pass } from '../../../reusables/Statuses';
import { isActiveLink } from '../isActiveLink';
import { Props as ParentProps } from './types';

type Props = { results: SuccessTestResult } & Pick<
  ParentProps,
  'setScreenshot' | 'story' | 'level'
>;

export const ScreenshotsEntry: React.FC<Props> = ({
  story,
  level,
  results,
  setScreenshot,
}) => {
  const screenshots = results.screenshots;

  return (
    <ScreenshotsList>
      {screenshots.others.map((it) => {
        const isActive = isActiveLink('screenshot', story.id, it.name);

        return (
          <li key={it.name} onClick={() => setScreenshot(story, it.name)}>
            <ScreenshotHeader
              level={level}
              style={{ backgroundColor: isActive ? blue[0] : '' }}
            >
              {renderType(it.result.type)}
              <ScreenshotTitle title={it.name}>
                <FileImageOutlined style={{ marginRight: 4 }} />
                {it.name}
              </ScreenshotTitle>
            </ScreenshotHeader>
          </li>
        );
      })}
      <li key="final" onClick={() => setScreenshot(story, undefined)}>
        <ScreenshotHeader
          level={level}
          style={{
            backgroundColor: isActiveLink('screenshot', story.id)
              ? blue[0]
              : '',
          }}
        >
          {renderType(screenshots.final.type)}
          <ScreenshotTitle title="FINAL">
            <FileImageOutlined style={{ marginRight: 4 }} />
            FINAL
          </ScreenshotTitle>
        </ScreenshotHeader>
      </li>
    </ScreenshotsList>
  );

  function renderType(type: ScreenshotComparisonResult['type']) {
    if (type === 'fail') {
      return <Fail />;
    }

    if (type === 'fresh') {
      return <Fresh />;
    }

    return <Pass />;
  }
};

const ScreenshotsList = styled.ul`
  padding: 0;
  text-decoration: 'none';
`;

const ScreenshotHeader = styled.div.attrs<{ level: number }>((props) => ({
  level: props.level,
}))`
  height: 25px;
  display: flex;
  align-items: center;
  padding: 2px;
  padding-left: ${(props) => `${props.level * 40 + 8}px`};
  transition: 0.2s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #fafafa;
  }
`;

const ScreenshotTitle = styled.span`
  margin-left: 6px;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;