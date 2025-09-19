

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
  responseBody: string; // this becomes AppwriteGetNearestResponseBody
  responseHeaders: { name: string; value: string }[];
  responseStatusCode: number;
  scheduledAt: string | null;
  status: string;
  trigger: string;
};

// Response from getCreaturesNearAsync serverless function

export type AppwriteGetNearestResponseBody =
  | { ok: true; reading: "found"; found: CreatureFound; detected: null }
  | { ok: true; reading: "detected"; found: null; detected: CreatureDetected }
  | { ok: true; reading: null; found: null; detected: null }
  | { ok: false; reading?: null; found?: null; detected?: null; error?: string };

export interface CreatureFound {
  id: string;
  name: string;
  lat: number;
  lng: number;
  distance_m: number;
  bearing_deg: number;
}

export interface CreatureDetected {
  distance_m: number;
  bearing_deg: number;
  lat: number;
  lng: number;
}