import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

interface DropdownProps {
  data: any;
  placeholder: string;
  getSelectedItem: (item: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, placeholder, getSelectedItem }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: any) => {
    setSelectedLabel(item.label);
    getSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>
          {selectedLabel || placeholder}
        </Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownMenu}>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return(
                <TouchableOpacity onPress={() => handleSelect(item)}>
                  <Text style={styles.dropdownItem}>{item.label}</Text>
                </TouchableOpacity>
              )
            }}

            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20
  },
  dropdownButton: {
    height: 45,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    justifyContent: "center"
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#888',
  },
  dropdownMenu: {
    maxHeight: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginTop: 5,
  },
  dropdownItem: {
    padding: 15,
    fontSize: 16,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;
