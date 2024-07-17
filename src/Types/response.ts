export type geometry = {
 coordinates: number[][];
 type: string;
};
export type metadata = {
 datasource_names: string[];
};

export type annotation = {
 datasources: number[];
 distance: number[];
 duration: number[];
 metadata: metadata;
 nodes: number[];
 speed: number[];
 weight: number[];
};

export type intersection = {
 bearings: number[];
 entry: boolean[];
 location: number[];
 out: number;
};
export type maneuver = {
 bearing_after: number;
 bearing_before: number;
 location: number[];
 type: string;
};

export type step = {
 distance: number;
 driving_side: string;
 duration: number;
 geometry: geometry;
 intersections: intersection[];
 maneuver: maneuver;
 mode: string;
 name: string;
 weight: number;
};

export type leg = {
 annotation: annotation;
 duration: number;
 distance: number;
 steps: step[];
 summary: string;
 weight: number;
};

export type route = {
 distance: number;
 duration: number;
 geometry: geometry;
 legs: leg[];
 weight: number;
 weight_name: string;
};

export type waypoint = {
 distance: number;
 hint: string;
 location: number[];
 name: string;
};

type response = {
 code: string;
 routes: route[];
 waypoints: waypoint[];
};
export default response;
