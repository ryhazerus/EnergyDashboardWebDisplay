# test_meter_validation.py

import pytest
from unittest.mock import Mock, patch

from src.models.connection_request import ConnectionRequest
from src.validation.base import valid_meter


@patch("meter_validation.HomeWizardValidator")
def test_valid_meter_homewizard(mock_validator_class):
    # Arrange
    mock_validator = Mock()
    mock_validator.validate.return_value = True
    mock_validator_class.return_value = mock_validator

    request = ConnectionRequest(
        meter_brand="HomeWizard P1 Meter", meter_ip_address="192.168.1.1"
    )

    # Act
    result = valid_meter(request)

    # Assert
    assert result == True
    mock_validator_class.assert_called_once_with("192.168.1.1")
    mock_validator.validate.assert_called_once()


def test_valid_meter_other_brand():
    # Arrange
    request = ConnectionRequest(
        meter_brand="Other Meter", meter_ip_address="192.168.1.1"
    )

    # Act
    result = valid_meter(request)

    # Assert
    assert result == False
