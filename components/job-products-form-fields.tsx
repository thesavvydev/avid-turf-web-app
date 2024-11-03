"use client";

import { Tables } from "@/types/supabase";
import { formatAsCurrency } from "@/utils/formatter";
import { Button, Label, Select, Table, TextInput } from "flowbite-react";
import { Trash2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

type TJobProduct = Omit<
  Tables<"business_location_job_products">,
  "created_at" | "id" | "job_id"
> & { id?: number };

export default function JobProductsFormFields({
  defaultCommission = 0,
  defaultJobProducts = [],
  products = [],
}: {
  defaultCommission?: number;
  defaultJobProducts?: TJobProduct[];
  products: Tables<"business_products">[];
}) {
  const { businessId, locationId } = useParams();
  const defaultProductRecord = {
    business_id: businessId as string,
    location_id: Number(locationId),
    product_id: 0,
    lead_price_addon: 0,
    number_of_units: 1,
    job_id: null,
  };

  const productDictionary = products.reduce<{
    [k: string]: Tables<"business_products">;
  }>((dictionary, product) => {
    dictionary[product.id] = product;

    return dictionary;
  }, {});

  const [commission, setCommission] = useState(defaultCommission);
  const [jobProducts, setJobProducts] =
    useState<TJobProduct[]>(defaultJobProducts);

  const productsTotal = jobProducts?.reduce((dictionary, product) => {
    const selectedProduct = productDictionary[product.product_id];
    dictionary +=
      product.number_of_units *
      (Number(selectedProduct?.price_per_measurement ?? 0) +
        Number(product.lead_price_addon));

    return dictionary;
  }, 0);

  const filteredOutSelectedProducts = products.filter(
    (p) => !jobProducts.find((jP) => jP.product_id === p.id),
  );

  return (
    <Table striped>
      <Table.Head>
        <Table.HeadCell className="hidden sm:table-cell">
          Product
        </Table.HeadCell>
        <Table.HeadCell className="hidden sm:table-cell">Units</Table.HeadCell>
        <Table.HeadCell className="hidden whitespace-nowrap sm:table-cell">
          Lead Price
        </Table.HeadCell>
        <Table.HeadCell className="hidden text-right sm:table-cell">
          Total
        </Table.HeadCell>
        <Table.HeadCell />
      </Table.Head>
      <Table.Body className="divide-y dark:divide-gray-600">
        {jobProducts.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={4}>No products.</Table.Cell>
          </Table.Row>
        ) : (
          jobProducts.map((product, index) => {
            const selectedProduct = productDictionary[product.product_id];
            const calculatedLineItemTotal =
              product.number_of_units *
              (Number(selectedProduct?.price_per_measurement) +
                Number(product.lead_price_addon));

            return (
              <Table.Row key={product.product_id}>
                <Table.Cell
                  colSpan={!product.product_id ? 5 : 1}
                  className="table-cell px-2 sm:hidden"
                >
                  {/* {product.id && (
                    <input
                      type="hidden"
                      name={`product__${index}__id`}
                      value={product.id}
                    />
                  )} */}
                  <div className="grid gap-2">
                    <div>
                      <Label
                        htmlFor={`product__${index}__product_id`}
                        className="mb-2 block"
                      >
                        Product
                      </Label>
                      <Select
                        className="md:w-52"
                        value={product.product_id?.toString()}
                        id={`product__${index}__product_id`}
                        name={`product__${index}__product_id`}
                        onChange={(e) => {
                          setJobProducts((prevState) =>
                            prevState.map((old, idx) => {
                              if (idx !== index) return old;

                              return {
                                ...old,
                                product_id: Number(e.target.value),
                              };
                            }),
                          );
                        }}
                      >
                        <option value="">Select a product</option>
                        {selectedProduct && (
                          <option value={selectedProduct.id}>
                            {selectedProduct.name}
                          </option>
                        )}
                        {filteredOutSelectedProducts.map((p) => (
                          <option key={p.id} value={p.id.toString()}>
                            {p.name}
                          </option>
                        ))}
                      </Select>
                    </div>
                    {product.product_id ? (
                      <>
                        <div>
                          <Label
                            htmlFor={`product__${index}__number_of_units`}
                            className="mb-2 block"
                          >
                            Number of units
                          </Label>
                          <TextInput
                            className="min-w-20"
                            defaultValue={product.number_of_units}
                            id={`product__${index}__number_of_units`}
                            name={`product__${index}__number_of_units`}
                            onChange={(e) => {
                              setJobProducts((prevState) =>
                                prevState.map((old, idx) => {
                                  if (idx !== index) return old;

                                  return {
                                    ...old,
                                    number_of_units: Number(e.target.value),
                                  };
                                }),
                              );
                            }}
                            type="number"
                          />
                        </div>
                        <div>
                          <Label
                            htmlFor={`product__${index}__lead_price_addon`}
                            className="mb-2 block"
                          >
                            Lead Price
                          </Label>
                          <TextInput
                            className="min-w-20"
                            defaultValue={product.lead_price_addon?.toString()}
                            id={`product__${index}__lead_price_addon`}
                            name={`product__${index}__lead_price_addon`}
                            onChange={(e) => {
                              setJobProducts((prevState) =>
                                prevState.map((old, idx) => {
                                  if (idx !== index) return old;

                                  return {
                                    ...old,
                                    lead_price_addon: Number(e.target.value),
                                  };
                                }),
                              );
                            }}
                            type="number"
                          />
                        </div>
                        {formatAsCurrency(Number(calculatedLineItemTotal))}
                        <Button
                          color="light"
                          className="text-red-400"
                          onClick={() =>
                            setJobProducts((prevState) =>
                              prevState.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <Trash2Icon className="mr-2 size-5 cursor-pointer text-red-400 opacity-50 hover:opacity-100" />
                          Remove
                        </Button>
                      </>
                    ) : null}
                  </div>
                </Table.Cell>
                <Table.Cell
                  colSpan={!product.product_id ? 5 : 1}
                  className="hidden sm:table-cell"
                >
                  <Select
                    className="md:w-52"
                    value={product.product_id?.toString()}
                    name={`product__${index}__product_id`}
                    onChange={(e) => {
                      setJobProducts((prevState) =>
                        prevState.map((old, idx) => {
                          if (idx !== index) return old;

                          return {
                            ...old,
                            product_id: Number(e.target.value),
                          };
                        }),
                      );
                    }}
                  >
                    <option value="">Select a product</option>
                    {selectedProduct && (
                      <option value={selectedProduct.id}>
                        {selectedProduct.name}
                      </option>
                    )}
                    {filteredOutSelectedProducts.map((p) => (
                      <option key={p.id} value={p.id.toString()}>
                        {p.name}
                      </option>
                    ))}
                  </Select>
                </Table.Cell>
                {product.product_id ? (
                  <>
                    <Table.Cell className="hidden sm:table-cell">
                      <TextInput
                        className="min-w-20"
                        defaultValue={product.number_of_units}
                        name={`product__${index}__number_of_units`}
                        onChange={(e) => {
                          setJobProducts((prevState) =>
                            prevState.map((old, idx) => {
                              if (idx !== index) return old;

                              return {
                                ...old,
                                number_of_units: Number(e.target.value),
                              };
                            }),
                          );
                        }}
                        type="number"
                      />
                    </Table.Cell>
                    <Table.Cell className="hidden sm:table-cell">
                      <TextInput
                        className="min-w-20"
                        defaultValue={product.lead_price_addon?.toString()}
                        name={`product__${index}__lead_price_addon`}
                        onChange={(e) => {
                          setJobProducts((prevState) =>
                            prevState.map((old, idx) => {
                              if (idx !== index) return old;

                              return {
                                ...old,
                                lead_price_addon: Number(e.target.value),
                              };
                            }),
                          );
                        }}
                        type="number"
                      />
                    </Table.Cell>
                    <Table.Cell className="hidden text-right font-semibold sm:table-cell">
                      {formatAsCurrency(Number(calculatedLineItemTotal))}
                    </Table.Cell>
                    <Table.Cell className="hidden w-0 sm:table-cell">
                      <Trash2Icon
                        className="cursor-pointer text-red-400 opacity-50 hover:opacity-100"
                        onClick={() =>
                          setJobProducts((prevState) =>
                            prevState.filter((_, i) => i !== index),
                          )
                        }
                      />
                    </Table.Cell>
                  </>
                ) : null}
              </Table.Row>
            );
          })
        )}
        <Table.Row className="sm:hidden">
          <Table.Cell className="px-2">
            <Button
              color="light"
              onClick={() =>
                setJobProducts((prevState) => [
                  ...prevState,
                  defaultProductRecord,
                ])
              }
              size="sm"
            >
              Add product
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="hidden sm:table-row">
          <Table.Cell colSpan={5}>
            <Button
              color="light"
              onClick={() =>
                setJobProducts((prevState) => [
                  ...prevState,
                  defaultProductRecord,
                ])
              }
              size="sm"
            >
              Add product
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row className="hidden sm:table-row">
          <Table.Cell colSpan={3}>
            <p className="text-lg">Commission</p>
          </Table.Cell>
          <Table.Cell colSpan={2}>
            <TextInput
              name="commission"
              onChange={(e) => setCommission(Number(e.target.value))}
              type="number"
              value={commission}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row className="hidden sm:table-row">
          <Table.Cell
            className="text-right text-lg font-bold text-green-400"
            colSpan={5}
          >
            {formatAsCurrency(Number(productsTotal) + commission)}
          </Table.Cell>
        </Table.Row>
        <Table.Row className="sm:hidden">
          <Table.Cell className="px-2">
            <p className="text-lg">Commission</p>
            <TextInput
              name="commission"
              onChange={(e) => setCommission(Number(e.target.value))}
              type="number"
              value={commission}
            />
          </Table.Cell>
        </Table.Row>
        <Table.Row className="sm:hidden">
          <Table.Cell className="text-right text-lg font-bold text-green-400">
            {formatAsCurrency(Number(productsTotal) + Number(commission))}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
