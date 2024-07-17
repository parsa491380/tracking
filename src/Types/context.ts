import React from "react";
import route from "./response";

type context = {
 firstLoc: number[] | null;
 setFirstLoc: React.Dispatch<React.SetStateAction<number[] | null>>;
 secondLoc: number[] | null;
 setSecondtLoc: React.Dispatch<React.SetStateAction<number[] | null>>;
 data: route | null;
 setData: React.Dispatch<React.SetStateAction<route | null>>;
 selectedRoute: number;
 setSelectedRoute: React.Dispatch<React.SetStateAction<number>>;
 routingType: string;
 setRoutingType: React.Dispatch<React.SetStateAction<string>>;
 routingDetailEnable: boolean;
 setRoutingDetailEnable: React.Dispatch<React.SetStateAction<boolean>>;
};
export default context;
