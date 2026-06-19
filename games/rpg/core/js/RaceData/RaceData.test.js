import { describe, it, expect } from 'vitest';
import {readFileSync} from "fs";
import RaceData from './RaceData.js';
import {readSchemaProperties} from "../Utilities/utilities.js";

const properties = readSchemaProperties('./databases/schemas/RaceData.schema.json');

const testData = {};
properties.forEach((property) => {
	const { key, type } = property;
	if (type === 'null') testData[key] = null;
	else if (type === 'array') testData[key] = [{ a: 1, b: 2 }];
	else if (type === 'object') testData[key] = { a: 1, b: 2 };
	else if (type === 'number') testData[key] = 1;
	else if (type === 'string') testData[key] = 'test';
	else if (type === 'boolean') testData[key] = true;
});

describe('RaceData', () => {
	describe('should create the data', () => {
		const raceData = new RaceData();

		it('should have all the properties and no extra', () => {
			expect(Object.keys(raceData)).toEqual(properties.map((property) => property.key));
		});

		it('should correctly set the data', () => {
			const raceData = new RaceData(testData);
			expect(raceData).toEqual(testData);
		});
	});
});