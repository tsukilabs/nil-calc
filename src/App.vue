<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import Sheet from '@/components/Sheet.vue';
import { Table, TableCell, TableHead, TableRow, localRef, useHeight } from '@tb-dev/vue';
import { computed, useTemplateRef } from 'vue';

const mainEl = useTemplateRef('mainEl');
const mainHeight = useHeight(mainEl);

const config = localRef<Config>('nil:config', {
  maxLevel: 30,
  wood: 0.3,
  stone: 0.4,
  iron: 0.3,
  maintenance: 0.005,
  cost: 100000,
  costGrowth: 0.2,
  workforce: 150,
  workforceGrowth: 0.2,
  production: 3600,
  productionGrowth: 0.2,
  capacity: 400_000,
  capacityGrowth: 0.2,
});

const results = computed(() => {
  const _results: Result[] = [];
  const maxLevel = config.value.maxLevel;
  if (!Number.isInteger(maxLevel) || maxLevel < 1) {
    return _results;
  }

  let cost = config.value.cost;
  let maintenance = cost * clamp(config.value.maintenance, 0, 1);
  let workforce = config.value.workforce;
  let production = config.value.production;
  let capacity = config.value.capacity;

  for (let level = maxLevel; level > 0; level--) {
    _results.push({
      level,
      wood: Math.ceil(cost * clamp(config.value.wood, 0, 1)),
      stone: Math.ceil(cost * clamp(config.value.stone, 0, 1)),
      iron: Math.ceil(cost * clamp(config.value.iron, 0, 1)),
      maintenance: Math.ceil(maintenance),
      totalCost: Math.ceil(cost),
      workforce: Math.ceil(workforce),
      production: Math.ceil(production),
      capacity: Math.ceil(capacity),
    });

    cost -= cost * clamp(config.value.costGrowth, 0, 1);
    maintenance = cost * clamp(config.value.maintenance, 0, 1);
    workforce -= workforce * clamp(config.value.workforceGrowth, 0, 1);
    production -= production * clamp(config.value.productionGrowth, 0, 1);
    capacity -= capacity * clamp(config.value.capacityGrowth, 0, 1);
  }

  _results.sort(({ level: a }, { level: b }) => a - b);

  return _results;
});

useColorMode({
  initialValue: 'dark',
  writeDefaults: true,
});

function clamp(value: number, min: number, max: number) {
  return Math.max(Math.min(value, max), min);
}
</script>

<template>
  <div class="fixed inset-0 overflow-hidden select-none">
    <header class="flex h-[48px] items-center justify-end px-4">
      <Sheet v-model="config" />
    </header>
    <main ref="mainEl" class="h-[calc(100vh-48px)] w-full overflow-x-auto">
      <Table
        :height="mainHeight - 20"
        width="100vw"
        container-class="px-4"
        header-class="sticky top-0 z-50"
      >
        <template #header>
          <TableRow class="bg-background hover:bg-background">
            <TableHead v-if="config.maxLevel > 1" class="w-16">
              <span>Level</span>
            </TableHead>
            <TableHead v-if="config.cost && config.costGrowth && config.wood">
              <span>Wood</span>
            </TableHead>
            <TableHead v-if="config.cost && config.costGrowth && config.stone">
              <span>Stone</span>
            </TableHead>
            <TableHead v-if="config.cost && config.costGrowth && config.iron">
              <span>Iron</span>
            </TableHead>
            <TableHead v-if="config.cost && config.costGrowth">
              <span>Cost</span>
            </TableHead>
            <TableHead v-if="config.cost && config.maintenance">
              <span>Maintenance</span>
            </TableHead>
            <TableHead v-if="config.workforce && config.workforceGrowth">
              <span>Workforce</span>
            </TableHead>
            <TableHead v-if="config.production && config.productionGrowth">
              <span>Production</span>
            </TableHead>
            <TableHead v-if="config.capacity && config.capacityGrowth">
              <span>Capacity</span>
            </TableHead>
          </TableRow>
        </template>

        <TableRow v-for="result of results" :key="result.level">
          <TableCell v-if="config.maxLevel > 1">
            {{ result.level }}
          </TableCell>
          <TableCell v-if="config.cost && config.costGrowth && config.wood">
            {{ result.wood }}
          </TableCell>
          <TableCell v-if="config.cost && config.costGrowth && config.stone">
            {{ result.stone }}
          </TableCell>
          <TableCell v-if="config.cost && config.costGrowth && config.iron">
            {{ result.iron }}
          </TableCell>
          <TableCell v-if="config.cost && config.costGrowth">
            {{ result.totalCost }}
          </TableCell>
          <TableCell v-if="config.cost && config.maintenance">
            {{ result.maintenance }}
          </TableCell>
          <TableCell v-if="config.workforce && config.workforceGrowth">
            {{ result.workforce }}
          </TableCell>
          <TableCell v-if="config.production && config.productionGrowth">
            {{ result.production }}
          </TableCell>
          <TableCell v-if="config.capacity && config.capacityGrowth">
            {{ result.capacity }}
          </TableCell>
        </TableRow>
      </Table>
    </main>
  </div>
</template>
