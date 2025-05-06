type Option<T> = T | null | undefined;

interface Config {
  capacity: number;
  capacityGrowth: number;
  cost: number;
  costGrowth: number;
  iron: number;
  maintenance: number;
  maxLevel: number;
  production: number;
  productionGrowth: number;
  stone: number;
  wood: number;
  workforce: number;
  workforceGrowth: number;
}

interface Result {
  capacity: number;
  iron: number;
  level: number;
  maintenance: number;
  production: number;
  stone: number;
  totalCost: number;
  wood: number;
  workforce: number;
}
