

//------------------- Types -------------------
export type AppwriteFunctionResult = {
  $createdAt: string;
  $id: string;
  $permissions: string[];
  $updatedAt: string;
  deploymentId: string;
  duration: number;
  errors: string;
  functionId: string;
  logs: string;
  requestHeaders: { name: string; value: string }[];
  requestMethod: string;
  requestPath: string;
  responseBody: string;
  responseHeaders: { name: string; value: string }[];
  responseStatusCode: number;
  scheduledAt: string | null;
  status: string;
  trigger: string;
};

export type AppwriteGetNearestResponseBody = {
  ok: boolean;
  count: number;
  radius_m: number;
  nearest: {
    id: string;
    name: string;
    lat: number;
    lng: number;
    distance_m: number;
    bearing_deg: number;
    sequence: number;
    imageId: string | null;
  };
  creatures: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    distance_m: number;
    bearing_deg: number;
    sequence: number;
    imageId: string | null;
  }>;
};