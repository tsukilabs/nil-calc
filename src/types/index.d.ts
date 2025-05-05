type Option<T> = T | null | undefined;

interface Config {
  maxLevel: number;
  wood: number;
  stone: number;
  iron: number;
  maintenance: number;
  cost: number;
  costGrowth: number;
  workforce: number;
  workforceGrowth: number;
  production: number;
  productionGrowth: number;
  capacity: number;
  capacityGrowth: number;
}

interface Result {
  level: number;
  wood: number;
  stone: number;
  iron: number;
  maintenance: number;
  totalCost: number;
  workforce: number;
  production: number;
  capacity: number;
}
