<script setup lang="ts">
import {
  Button,
  InputNumber,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  useHeight,
} from '@tb-dev/vue';
import { useTemplateRef } from 'vue';
import { toPixel } from '@tb-dev/utils';

const config = defineModel<Config>({ required: true });

const contentEl = useTemplateRef('contentEl');
const contentHeight = useHeight(contentEl);
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button size="sm">Options</Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Options</SheetTitle>
      </SheetHeader>

      <div ref="contentEl" class="size-full p-4">
        <ScrollArea :style="{ height: toPixel(contentHeight - 80) }">
          <div class="flex flex-col items-start gap-3 pr-4 pb-4 pl-2">
            <InputNumber v-model="config.maxLevel" label="Level" :min="1" :max="30" :step="1" />
            <InputNumber v-model="config.wood" label="Wood" :min="0" :max="1" :step="0.05" />
            <InputNumber v-model="config.stone" label="Stone" :min="0" :max="1" :step="0.05" />
            <InputNumber v-model="config.iron" label="Iron" :min="0" :max="1" :step="0.05" />
            <InputNumber
              v-model="config.cost"
              label="Cost"
              :min="0"
              :max="1_000_000_000"
              :step="1000"
            />
            <InputNumber
              v-model="config.costGrowth"
              label="Cost Growth"
              :min="0"
              :max="1"
              :step="0.05"
            />
            <InputNumber
              v-model="config.maintenance"
              label="Maintenance"
              :min="0"
              :max="1"
              :step="0.001"
            />
            <InputNumber
              v-model="config.workforce"
              label="Workforce"
              :min="0"
              :max="10_000"
              :step="10"
            />
            <InputNumber
              v-model="config.workforceGrowth"
              label="Workforce Growth"
              :min="0"
              :max="1"
              :step="0.05"
            />
            <InputNumber
              v-model="config.production"
              label="Production"
              :min="0"
              :max="100_000"
              :step="100"
            />
            <InputNumber
              v-model="config.productionGrowth"
              label="Production Growth"
              :min="0"
              :max="1"
              :step="0.05"
            />
            <InputNumber
              v-model="config.capacity"
              label="Capacity"
              :min="0"
              :max="100_000_000"
              :step="10000"
            />
            <InputNumber
              v-model="config.capacityGrowth"
              label="Capacity Growth"
              :min="0"
              :max="1"
              :step="0.05"
            />
          </div>
        </ScrollArea>
        <div></div>
      </div>
    </SheetContent>
  </Sheet>
</template>
