"use client";

import { useEffect } from "react";

import ImageGallery from "./components/ImageGallery";
import Tags from "./components/Tags";
import Card from "./components/Card";
import Features from "./components/Features";
import Equipments from "./components/Equipments";
import Spotlight from "./components/Spotlight";

import { Vehicles } from "@/data/vehicle";

interface VehicleDetailsProps {
  vehicle: Vehicles & {
    images: string[];
    features: string[];
    equipments: { id: number; name: string; icon: string }[];
  };
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  useEffect(() => {
    // Ajouter la classe au body
    document.body.classList.add("vehicle-details-page");

    // Nettoyer en retirant la classe quand le composant est démonté
    return () => {
      document.body.classList.remove("vehicle-details-page");
    };
  }, []);

  return (
    <article className="bg-white min-h-screen pt-20 px-8 lg:px-32 pb-10 lg:pt-40 2xl:px-96">
      <section className="flex flex-col gap-10 lg:flex-row">
        <ImageGallery images={vehicle.images} modelName={vehicle.model} />
        <aside className="flex flex-col gap-4 w-full lg:w-1/2 lg:h-auto">
          <h1 className="text-3xl lg:text-4xl text-secondary font-bold mb-4 uppercase font-roboto">
            {vehicle.brand}{" "}
            <span className="text-primary text-nowrap">{vehicle.model}</span>
          </h1>
          <Tags vehicle={vehicle} />
          <div className="text-lg lg:text-lg xl:text-xl text-secondary font-georgia pt-4 leading-6 flex-1 flex flex-col justify-between">
            <div>
              {Array.isArray(vehicle.description) ? (
                vehicle.description.map((desc, index) => (
                  <p key={index} className="pb-10">
                    {desc}
                  </p>
                ))
              ) : (
                <p>{vehicle.description}</p>
              )}
            </div>
            <div className="bg-secondary/80 h-px w-full" />
          </div>
        </aside>
      </section>
      <section className="flex flex-col gap-10 lg:flex-row md:mt-10">
        <Card price={vehicle.price} priceWithDriver={vehicle.priceWithDriver} />
        <div className="flex flex-col gap-10 lg:w-1/2">
          <Features features={vehicle.features} model={vehicle.model} />
          <Equipments equipments={vehicle.equipments} />
        </div>
      </section>
      <Spotlight currentVehicleId={vehicle.id} />
    </article>
  );
}
