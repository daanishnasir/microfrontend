import * as React from "react";
import "./styles.css";
import {
  SearchOutlined,
  PlusOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import type { Option } from "@resi-media/resi-ui";
import { css } from "@emotion/react";
import { Draft, Inline, Stack } from "@resi-media/resi-ui";
import { produce } from "immer";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ContentHeader } from "../../components/ContentHeader";
import { hardwareUnits } from "../../assets/hardware-units";

type SearchForm = {
  buildDateEnd: string;
  buildDateStart: string;
  locationId: string;
  modelId: string;
  serialNumber: string;
  statusId: string;
  type: string;
  vendorSaleInvoice: string;
};

type HardwareUnit = {
  buildDate: string;
  customerOwnerId: string;
  la1SaleInvoice: string;
  locationId: string;
  modelId: string;
  notes: string;
  saleDate: string | null;
  serial: string;
  statusId: string;
  type: "decoder" | "encoder";
  uuid: string;
  vendorSaleInvoice: string;
  warrantyLength: number;
};

interface HardwareState {
  hardwareUnits: HardwareUnit[];
  isMoreFilters: boolean;
}

const initialHardwareState = {
  hardwareUnits: [],
  isMoreFilters: false,
};

const ListViewHardware = (): JSX.Element => {
  const mounted = React.useRef(false);

  const [state, setState] = React.useState<HardwareState>(initialHardwareState);

  const initialEditState: SearchForm = {
    buildDateEnd: "",
    buildDateStart: "",
    locationId: "",
    modelId: "",
    serialNumber: "",
    statusId: "",
    type: "",
    vendorSaleInvoice: "",
  };

  const methods = useForm<SearchForm>({
    defaultValues: initialEditState,
    mode: "all",
  });

  const { control, getValues, handleSubmit, setValue } = methods;

  // const getHardwareUnits = useClient({
  //   config: useClient.central.v1.hardwareUnits.GET,
  //   query: {
  //     size: 200,
  //     sort: "serial",
  //     sortDirection: "asc",
  //     page: 0,
  //   },
  // });

  // const hardwareModelOptions = useSelector(selectModelsOptions);
  // const hardwareLocationOptions = useSelector(selectLocationsOptions);
  // const hardwareStatusOptions = useSelector(selectStatusesOptions);

  // const initialEditState: Hardware.Derived.SearchForm = {
  //   buildDateEnd: "",
  //   buildDateStart: "",
  //   locationId: "",
  //   modelId: "",
  //   serialNumber: "",
  //   statusId: "",
  //   type: "",
  //   vendorSaleInvoice: "",
  // };

  // const methods = useForm<Hardware.Derived.SearchForm>({
  //   defaultValues: initialEditState,
  //   mode: "all",
  // });
  // const { control, getValues, handleSubmit, setValue } = methods;

  const allModelOptions: Option[] = React.useMemo(() => {
    return [
      {
        value: "",
        label: "All Models",
      },
      {
        value: "D2100",
        label: "D2100",
      },
      {
        value: "E1210",
        label: "E1210",
      },
    ];
  }, []);

  const allLocationOptions: Option[] = React.useMemo(() => {
    return [
      {
        value: "",
        label: "All Locations",
      },
      {
        value: "Plano Office",
        label: "Plano Office",
      },
      {
        value: "Twisted Transistor",
        label: "Twisted Transistor",
      },
    ];
  }, []);

  const allStatusOptions: Option[] = React.useMemo(() => {
    return [
      {
        value: "",
        label: "All Statuses",
      },
      {
        value: "Customer Owned",
        label: "Customer Owned",
      },
      {
        value: "Dealer Owned",
        label: "Dealer Owned",
      },
    ];
  }, []);

  const hardwareTypeOptions: Option[] = React.useMemo(
    () => [
      { label: "All Hardware", value: "" },
      { label: "Encoder", value: "encoder" },
      { label: "Decoder", value: "decoder" },
    ],
    []
  );

  const handleFormSubmit = async (data: SearchForm) => {
    const filters = {
      ...(data.type && { type: data.type }),
      ...(data.modelId && { modelId: data.modelId }),
      ...(data.serialNumber && { serial: data.serialNumber }),
      ...(data.vendorSaleInvoice && {
        vendorSaleInvoice: data.vendorSaleInvoice,
      }),
      ...(data.locationId && { locationId: data.locationId }),
      ...(data.statusId && { statusId: data.statusId }),
    };

    console.log("filters: ", filters);
  };

  // React.useEffect(() => {
  //   if (!mounted.current) {
  //     dispatch(fetch.customerNames.request());
  //     dispatch(fetchHardware.models.request());
  //     dispatch(fetchHardware.locations.request());
  //     dispatch(fetchHardware.status.request());
  //     mounted.current = true;
  //   }
  // }, [dispatch]);

  // React.useEffect(() => {
  //   return () => {
  //     mounted.current = false;
  //   };
  // }, []);

  // const handleFormSubmit = async (data: Hardware.Derived.SearchForm) => {
  //   const filters = {
  //     ...(data.type && { type: data.type }),
  //     ...(data.modelId && { modelId: data.modelId }),
  //     ...(data.serialNumber && { serial: data.serialNumber }),
  //     ...(data.vendorSaleInvoice && {
  //       vendorSaleInvoice: data.vendorSaleInvoice,
  //     }),
  //     ...(data.locationId && { locationId: data.locationId }),
  //     ...(data.statusId && { statusId: data.statusId }),
  //     ...(data.buildDateStart && {
  //       buildDateStart: utils.formatByString(
  //         new Date(data.buildDateStart),
  //         `yyyy-MM-dd`
  //       ),
  //     }),
  //     ...(data.buildDateEnd && {
  //       buildDateEnd: utils.formatByString(
  //         new Date(data.buildDateEnd),
  //         `yyyy-MM-dd`
  //       ),
  //     }),
  //   };

  //   try {
  //     const hardwareUnitsResponse = await getHardwareUnits
  //       .query(filters)
  //       .callApi();
  //     setState(
  //       produce((draft) => {
  //         draft.hardwareUnits = hardwareUnitsResponse;
  //       })
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div data-testid="hardware-search-page" className="hardware-page">
      <FormProvider {...methods}>
        <form id="search-hardware" onSubmit={handleSubmit(handleFormSubmit)}>
          <header className="header">
            <h3 className="titleIcon-container">
              <SearchOutlined
                style={{ fontSize: "32px", marginRight: "1rem" }}
              />
              <span className="hardware-search-title"> Hardware Search </span>
            </h3>
            <Draft.Button
              data-testid="add-preset-button"
              label="Add Decoder"
              startNode={<PlusOutlined />}
            />
          </header>

          <div className="hardware-search-list-content">
            <Stack scale="xl">
              <Draft.Card>
                <Draft.CardSection>
                  <Inline scale="m">
                    <Controller
                      control={control}
                      name="serialNumber"
                      render={({
                        field: { name, onBlur, onChange, value },
                        fieldState: { error, invalid, isDirty, isTouched },
                        formState: { isSubmitted },
                      }) => {
                        return (
                          <Draft.FormField
                            error={error?.message}
                            fieldLabel="Serial Number"
                            htmlFor="serialNumber"
                            touched={isTouched || isSubmitted || isDirty}
                          >
                            <Draft.TextInput
                              data-testid="serial-number-edit"
                              hasError={invalid && Boolean(error?.message)}
                              id="serialNumber"
                              name={name}
                              onBlur={onBlur}
                              onChange={onChange}
                              value={value}
                            />
                          </Draft.FormField>
                        );
                      }}
                    />

                    <Controller
                      control={control}
                      name="vendorSaleInvoice"
                      render={({
                        field: { name, onBlur, onChange, value },
                        fieldState: { error, invalid, isDirty, isTouched },
                        formState: { isSubmitted },
                      }) => {
                        return (
                          <Draft.FormField
                            error={error?.message}
                            fieldLabel="Vendor Invoice #"
                            htmlFor="vendorSaleInvoice"
                            touched={isTouched || isSubmitted || isDirty}
                          >
                            <Draft.TextInput
                              data-testid="vendor-invoice-edit"
                              hasError={invalid && Boolean(error?.message)}
                              id="vendorSaleInvoice"
                              name={name}
                              onBlur={onBlur}
                              onChange={onChange}
                              value={value}
                            />
                          </Draft.FormField>
                        );
                      }}
                    />
                  </Inline>

                  {/* More Filters Block  */}
                  {state.isMoreFilters && (
                    <div data-testid="more-filters-section">
                      <Inline marginTop="l" scale="m">
                        <Controller
                          name="type"
                          render={({
                            field: { name, onBlur, value },
                            fieldState: { error, isTouched },
                            formState: { isSubmitted },
                          }) => {
                            return (
                              <Draft.FormField
                                error={error?.message}
                                fieldLabel="Types"
                                htmlFor="type"
                                touched={isTouched || isSubmitted}
                              >
                                <Draft.Select
                                  appendToBody
                                  dataTestId="type-select"
                                  hasError={Boolean(error)}
                                  inputId="type"
                                  name={name}
                                  onBlur={onBlur}
                                  onChange={(option) => {
                                    if (option) {
                                      setValue("type", option.value);
                                    }
                                  }}
                                  options={hardwareTypeOptions}
                                  value={hardwareTypeOptions.find(
                                    (opt) => opt.value === value
                                  )}
                                />
                              </Draft.FormField>
                            );
                          }}
                        />
                        <Controller
                          name="modelId"
                          render={({
                            field: { name, onBlur, value },
                            fieldState: { error, isTouched },
                            formState: { isSubmitted },
                          }) => {
                            return (
                              <Draft.FormField
                                error={error?.message}
                                fieldLabel="Models"
                                htmlFor="modelId"
                                touched={isTouched || isSubmitted}
                              >
                                <Draft.Select
                                  appendToBody
                                  customCss={{
                                    container: css`
                                      display: "flex";
                                    `,
                                  }}
                                  dataTestId="model-select"
                                  hasError={Boolean(error)}
                                  inputId="modelId"
                                  name={name}
                                  onBlur={onBlur}
                                  onChange={(option) => {
                                    if (option) {
                                      setValue("modelId", option.value);
                                    }
                                  }}
                                  options={allModelOptions}
                                  value={allModelOptions.find(
                                    (opt) => opt.value === value
                                  )}
                                />
                              </Draft.FormField>
                            );
                          }}
                        />

                        <Controller
                          name="locationId"
                          render={({
                            field: { name, onBlur, value },
                            fieldState: { error, isTouched },
                            formState: { isSubmitted },
                          }) => {
                            return (
                              <Draft.FormField
                                error={error?.message}
                                fieldLabel="Location"
                                htmlFor="locationId"
                                touched={isTouched || isSubmitted}
                              >
                                <Draft.Select
                                  appendToBody
                                  dataTestId="location-select"
                                  hasError={Boolean(error)}
                                  inputId="locationId"
                                  name={name}
                                  onBlur={onBlur}
                                  onChange={(option) => {
                                    if (option) {
                                      setValue("locationId", option.value);
                                    }
                                  }}
                                  options={allLocationOptions}
                                  value={allLocationOptions.find(
                                    (opt) => opt.value === value
                                  )}
                                />
                              </Draft.FormField>
                            );
                          }}
                        />
                        <Controller
                          name="statusId"
                          render={({
                            field: { name, onBlur, value },
                            fieldState: { error, isTouched },
                            formState: { isSubmitted },
                          }) => {
                            return (
                              <Draft.FormField
                                error={error?.message}
                                fieldLabel={"Status"}
                                htmlFor="statusId"
                                touched={isTouched || isSubmitted}
                              >
                                <Draft.Select
                                  appendToBody
                                  dataTestId="status-select"
                                  hasError={Boolean(error)}
                                  inputId="statusId"
                                  name={name}
                                  onBlur={onBlur}
                                  onChange={(option) => {
                                    if (option) {
                                      setValue("statusId", option.value);
                                    }
                                  }}
                                  options={allStatusOptions}
                                  value={allStatusOptions.find(
                                    (opt) => opt.value === value
                                  )}
                                />
                              </Draft.FormField>
                            );
                          }}
                        />
                      </Inline>
                    </div>
                  )}

                  <Inline justifyContent="space-between" marginTop="xl">
                    <Draft.Button
                      data-testid="more-filters-button"
                      label={
                        !state.isMoreFilters ? "More Filters" : "Less Filters"
                      }
                      onClick={() => {
                        setState(
                          produce((draft) => {
                            draft.isMoreFilters = !state.isMoreFilters;
                          })
                        );
                      }}
                      startNode={
                        !state.isMoreFilters ? <DownOutlined /> : <UpOutlined />
                      }
                      variant="outlined"
                    />

                    <Draft.Button
                      data-testid="search-button"
                      label="Search"
                      startNode={<SearchOutlined />}
                      type="submit"
                    />
                  </Inline>
                </Draft.CardSection>
              </Draft.Card>
            </Stack>
          </div>

          {/*
      <ContentPane data-testid="hardware-search-list-content">
        <div data-testid="customer-view">
          <FormProvider {...methods}>
            <form
              id="search-hardware"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <Stack scale="xl">
                <Draft.Card>
                  <Draft.CardSection>
                    <Inline scale="m">
                      <Controller
                        control={control}
                        name="serialNumber"
                        render={({
                          field: { name, onBlur, onChange, value },
                          fieldState: { error, invalid, isDirty, isTouched },
                          formState: { isSubmitted },
                        }) => {
                          return (
                            <Draft.FormField
                              error={error?.message}
                              fieldLabel={commonT("serialNumber")}
                              htmlFor="serialNumber"
                              touched={isTouched || isSubmitted || isDirty}
                            >
                              <Draft.TextInput
                                data-testid="serial-number-edit"
                                hasError={invalid && Boolean(error?.message)}
                                id="serialNumber"
                                name={name}
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                              />
                            </Draft.FormField>
                          );
                        }}
                      />

                      <Controller
                        control={control}
                        name="vendorSaleInvoice"
                        render={({
                          field: { name, onBlur, onChange, value },
                          fieldState: { error, invalid, isDirty, isTouched },
                          formState: { isSubmitted },
                        }) => {
                          return (
                            <Draft.FormField
                              error={error?.message}
                              fieldLabel={prefixNS("vendorInvoice")}
                              htmlFor="vendorSaleInvoice"
                              touched={isTouched || isSubmitted || isDirty}
                            >
                              <Draft.TextInput
                                data-testid="vendor-invoice-edit"
                                hasError={invalid && Boolean(error?.message)}
                                id="vendorSaleInvoice"
                                name={name}
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                              />
                            </Draft.FormField>
                          );
                        }}
                      />
                    </Inline>

                    {state.isMoreFilters && (
                      <div data-testid="more-filters-section">
                        <Inline marginTop="l" scale="m">
                          <Controller
                            name="type"
                            render={({
                              field: { name, onBlur, value },
                              fieldState: { error, isTouched },
                              formState: { isSubmitted },
                            }) => {
                              return (
                                <Draft.FormField
                                  error={error?.message}
                                  fieldLabel={prefixNS("types")}
                                  htmlFor="type"
                                  touched={isTouched || isSubmitted}
                                >
                                  <Draft.Select
                                    appendToBody
                                    dataTestId="type-select"
                                    hasError={Boolean(error)}
                                    inputId="type"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setValue("type", option.value);
                                      }
                                    }}
                                    options={hardwareTypeOptions}
                                    value={hardwareTypeOptions.find(
                                      (opt) => opt.value === value
                                    )}
                                  />
                                </Draft.FormField>
                              );
                            }}
                          />
                          <Controller
                            name="modelId"
                            render={({
                              field: { name, onBlur, value },
                              fieldState: { error, isTouched },
                              formState: { isSubmitted },
                            }) => {
                              return (
                                <Draft.FormField
                                  error={error?.message}
                                  fieldLabel={prefixNS("models")}
                                  htmlFor="modelId"
                                  touched={isTouched || isSubmitted}
                                >
                                  <Draft.Select
                                    appendToBody
                                    dataTestId="model-select"
                                    hasError={Boolean(error)}
                                    inputId="modelId"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setValue("modelId", option.value);
                                      }
                                    }}
                                    options={allModelOptions}
                                    value={allModelOptions.find(
                                      (opt) => opt.value === value
                                    )}
                                  />
                                </Draft.FormField>
                              );
                            }}
                          />

                          <Controller
                            name="locationId"
                            render={({
                              field: { name, onBlur, value },
                              fieldState: { error, isTouched },
                              formState: { isSubmitted },
                            }) => {
                              return (
                                <Draft.FormField
                                  error={error?.message}
                                  fieldLabel={prefixNS("location")}
                                  htmlFor="locationId"
                                  touched={isTouched || isSubmitted}
                                >
                                  <Draft.Select
                                    appendToBody
                                    dataTestId="location-select"
                                    hasError={Boolean(error)}
                                    inputId="locationId"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setValue("locationId", option.value);
                                      }
                                    }}
                                    options={allLocationOptions}
                                    value={allLocationOptions.find(
                                      (opt) => opt.value === value
                                    )}
                                  />
                                </Draft.FormField>
                              );
                            }}
                          />
                          <Controller
                            name="statusId"
                            render={({
                              field: { name, onBlur, value },
                              fieldState: { error, isTouched },
                              formState: { isSubmitted },
                            }) => {
                              return (
                                <Draft.FormField
                                  error={error?.message}
                                  fieldLabel={"Status"}
                                  htmlFor="statusId"
                                  touched={isTouched || isSubmitted}
                                >
                                  <Draft.Select
                                    appendToBody
                                    dataTestId="status-select"
                                    hasError={Boolean(error)}
                                    inputId="statusId"
                                    name={name}
                                    onBlur={onBlur}
                                    onChange={(option) => {
                                      if (option) {
                                        setValue("statusId", option.value);
                                      }
                                    }}
                                    options={allStatusOptions}
                                    value={allStatusOptions.find(
                                      (opt) => opt.value === value
                                    )}
                                  />
                                </Draft.FormField>
                              );
                            }}
                          />
                        </Inline>

                        <Inline
                          marginTop="l"
                          scale="m"
                          style={{ width: "49.5%" }}
                        >
                          <Controller
                            name="buildDateStart"
                            render={({
                              field: { name, onBlur, onChange, value },
                              fieldState: { isTouched },
                            }) => {
                              return (
                                <Draft.FormField
                                  fieldLabel={prefixNS("buildDateStart")}
                                  htmlFor={name}
                                  touched={isTouched}
                                >
                                  <Draft.DatePickerNew
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    startInputProps={{
                                      dataTestId: "build-date-start",
                                    }}
                                    value={value}
                                  />
                                </Draft.FormField>
                              );
                            }}
                          />
                          <Controller
                            name="buildDateEnd"
                            render={({
                              field: { name, onBlur, onChange, value },
                              fieldState: { isTouched },
                            }) => {
                              return (
                                <Draft.FormField
                                  fieldLabel={prefixNS("buildDateEnd")}
                                  htmlFor={name}
                                  touched={isTouched}
                                >
                                  <Draft.DatePickerNew
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    startInputProps={{
                                      dataTestId: "build-date-end",
                                    }}
                                    value={value}
                                  />
                                </Draft.FormField>
                              );
                            }}
                          />
                        </Inline>
                      </div>
                    )}

                    <Inline justifyContent="space-between" marginTop="xl">
                      <Draft.Button
                        data-testid="more-filters-button"
                        label={
                          !state.isMoreFilters
                            ? prefixNS("moreFilters")
                            : prefixNS("lessFilters")
                        }
                        onClick={() => {
                          setState(
                            produce((draft) => {
                              draft.isMoreFilters = !state.isMoreFilters;
                            })
                          );
                        }}
                        startNode={
                          !state.isMoreFilters ? (
                            <DownOutlined />
                          ) : (
                            <UpOutlined />
                          )
                        }
                        variant="outlined"
                      />

                      <Draft.Button
                        data-testid="search-button"
                        label={commonT("search")}
                        startNode={<SearchOutlined />}
                        type="submit"
                      />
                    </Inline>
                  </Draft.CardSection>
                </Draft.Card>
              </Stack>
            </form>
          </FormProvider>
        </div>
        <ErrorBlock
          dataTestId="hardware-error"
          error={getHardwareUnits.error}
          marginTop="xl"
        />
        <HardwareList
          handleFormSubmit={() => handleFormSubmit(getValues())}
          hardwareLocations={hardwareLocationOptions}
          hardwareModels={hardwareModelOptions}
          hardwareStatuses={hardwareStatusOptions}
          hardwareUnits={state.hardwareUnits}
          isLoading={getHardwareUnits.isFetching}
        />
      </ContentPane> */}
        </form>
      </FormProvider>
    </div>
  );
};

ListViewHardware.displayName = "ListViewHardware";

export default ListViewHardware;
