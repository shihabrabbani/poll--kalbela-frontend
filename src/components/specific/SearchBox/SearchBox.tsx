"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import districtList from "@/assets/data/districtList";
import seatList from "@/assets/data/seatList";
import { getSeatNamesForDistrict } from "@/assets/data/districtToSeatNames";
import SearchableSelect from "@/components/common/SearchableSelect";

const EMPTY = "all";

export default function SearchBox() {
  const router = useRouter();
  const [divisionValue, setDivisionValue] = useState<string>(EMPTY);
  const [districtValue, setDistrictValue] = useState<string>(EMPTY);
  const [seatValue, setSeatValue] = useState<string>(EMPTY);

  const divisionOptions = useMemo(() => districtList.map((d) => d.text), []);

  const selectedDivisionKey = useMemo(() => {
    if (divisionValue === EMPTY) return null;
    const d = districtList.find((x) => x.text === divisionValue);
    return d?.division ?? null;
  }, [divisionValue]);

  const districtOptions = useMemo(() => {
    // If no division selected, suggest all districts
    if (!selectedDivisionKey) {
      return districtList
        .flatMap((d) => d.districts ?? [])
        .map((x) => x.districtName);
    }
    // If division selected, show filtered districts
    const div = districtList.find((d) => d.division === selectedDivisionKey);
    return (div?.districts ?? []).map((x) => x.districtName);
  }, [selectedDivisionKey]);

  const seatOptions = useMemo(() => {
    // If district selected, use explicit mapping so every district suggests seats
    if (districtValue !== EMPTY) {
      const trimmed = districtValue.trim();
      const byDistrict = getSeatNamesForDistrict(trimmed);
      if (byDistrict.length) return byDistrict;
    }

    // If no district: show seats by division or all
    if (selectedDivisionKey) {
      const div = seatList.find((d) => d.division === selectedDivisionKey);
      const seats = (div?.seats ?? []).filter((s) => Boolean(s.seatName));
      return seats.map((s) => s.seatName as string);
    }

    // No division, no district: all seats
    return seatList
      .flatMap((d) => d.seats ?? [])
      .filter((s) => Boolean(s.seatName))
      .map((s) => s.seatName as string);
  }, [selectedDivisionKey, districtValue]);

  const seatNameToNo = useMemo(() => {
    const m = new Map<string, string>();

    // Always include all seats in the map to support searching any seat
    seatList.forEach((div) => {
      const seats = div.seats ?? [];
      seats.forEach((s) => {
        if (s.seatName) m.set(s.seatName, String(s.seatNo));
      });
    });
    return m;
  }, []);

  const onDivisionChange = (value: string) => {
    setDivisionValue(value);
    setDistrictValue(EMPTY);
    setSeatValue(EMPTY);
  };

  const onDistrictChange = (value: string) => {
    setDistrictValue(value);
    setSeatValue(EMPTY);
  };

  const onSeatChange = (value: string) => {
    setSeatValue(value);
  };

  const handleSearch = () => {
    if (seatValue !== EMPTY) {
      const trimmedSeat = seatValue.trim();
      const seatNo = seatNameToNo.get(trimmedSeat);
      if (seatNo) router.push(`/pools/seat-${seatNo}`);
    } else if (districtValue !== EMPTY) {
      const trimmedDistrict = districtValue.trim();
      router.push(`/districts/${encodeURIComponent(trimmedDistrict)}`);
    }
  };

  return (
    <section className="mt-6 lg:mt-8">
      <div className="container mx-auto">
        <div className="bg-white rounded-2xl border border-gray-300 py-8 p-4">
          <p className="text-left text-gray-800 text-lg lg:text-xl font-bold mb-4 lg:mb-5">
            আপনার পছন্দের প্রার্থীকে সমর্থন করতে আসন সিলেক্ট করুন
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="sm:col-span-1">
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                বিভাগ
              </label> */}
              <SearchableSelect
                options={divisionOptions}
                value={divisionValue}
                onChange={onDivisionChange}
                placeholder="বিভাগ নির্বাচন করুন"
                className="w-full"
              />
            </div>
            <div className="sm:col-span-1">
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                জেলা
              </label> */}
              <SearchableSelect
                options={districtOptions}
                value={districtValue}
                onChange={onDistrictChange}
                placeholder="জেলা নির্বাচন করুন"
                className="w-full"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1 flex items-end gap-2">
              <div className="flex-1">
                {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                  আসন
                </label> */}
                <SearchableSelect
                  options={seatOptions}
                  value={seatValue}
                  onChange={onSeatChange}
                  placeholder="আসন নির্বাচন করুন"
                  className="w-full"
                />
              </div>
              <button
                onClick={handleSearch}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-PurpleDark hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={seatValue === EMPTY}
                title="খুঁজুন"
              >
                <IoSearch size={18} />
                খুঁজুন
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
