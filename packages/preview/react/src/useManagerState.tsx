import { useMemo } from 'react';
import {
  assertNotEmpty,
  createManagerConnection,
  PureStoryTree,
  TreeOP,
  PurePresetGroup,
  CustomPresetGroup,
} from '@storyshots/core';
import { createActor } from './actor';
import { Props, StoryTree } from './types';

export function useManagerState(props: Props) {
  return useMemo(() => {
    const top = window.top;

    assertNotEmpty(top, 'Preview should be wrapped in manager');

    return createManagerConnection(top, {
      stories: toPureStories(props.stories),
      devices: props.devices,
      presets: toPurePresets(props.presets),
    });
  }, [props.stories]);
}

function toPureStories(nodes: StoryTree[]): PureStoryTree[] {
  return TreeOP.map(nodes, {
    node: (node) => node,
    leaf: (leaf) => ({
      title: leaf.title,
      actions: leaf.act(createActor()).toMeta(),
    }),
  });
}

function toPurePresets(
  presets: CustomPresetGroup<unknown>[],
): PurePresetGroup[] {
  return presets.map((presetGroup) => {
    return {
      name: presetGroup.name,
      default: presetGroup.default.name,
      additional: presetGroup.additional.map((preset) => preset.name),
    };
  });
}
