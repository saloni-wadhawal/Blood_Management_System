// utils/bloodCompatibility.js

export const isCompatible = (donorGroup, requiredGroup) => {
  const map = {
    "O-": ["O-","O+","A-","A+","B-","B+","AB-","AB+"],
    "O+": ["O+","A+","B+","AB+"],
    "A-": ["A-","A+","AB-","AB+"],
    "A+": ["A+","AB+"],
    "B-": ["B-","B+","AB-","AB+"],
    "B+": ["B+","AB+"],
    "AB-": ["AB-","AB+"],
    "AB+": ["AB+"]
  };

  return map[donorGroup]?.includes(requiredGroup);
};