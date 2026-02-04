import dataclasses
from typing import Optional

from homewizard_energy.models import Measurement
from pydantic import BaseModel, Field


@dataclasses.dataclass
class EnergyDisplayX:
    data_p1_meter: Optional[Measurement] = None

    # Live values are accumulated values per day
    edx_gas_live: Optional[float] = 0.00
    edx_energy_live: Optional[float] = 0.00
    edx_energy_export_live: Optional[float] = 0.00
    edx_water_live: Optional[float] = 0.00
    # Costs based on tariffs
    edx_gas_costs: Optional[float] = 0.00
