package config

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func contains(slice []string, key string) bool {
	for _, sliceItem := range slice {
		if sliceItem == key {
			return true
		}
	}
	return false
}

func check(env map[string]string, err error) (map[string]string, error) {
	if err != nil {
		return nil, err
	}

	for _, envName := range Required {
		if env[envName] == "" {
			return nil, fmt.Errorf("missing %v", envName)
		}
	}

	return env, nil
}

func getEnvFileNames() ([]string, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return nil, err
	}
	fileNames, err := os.ReadDir(cwd)
	if err != nil {
		return nil, err
	}

	var envFileNames []string
	for _, fileName := range fileNames {
		if strings.HasPrefix(fileName.Name(), ".env") {
			envFileNames = append(envFileNames, fileName.Name())
		}
	}

	return envFileNames, nil
}

func loadFromFiles() (map[string]string, error) {
	envFileNames, err := getEnvFileNames()
	if err != nil {
		return nil, err
	}

	env := make(map[string]string)
	for _, envFileName := range envFileNames {
		envFile, err := os.Open(envFileName)
		if err != nil {
			return nil, err
		}

		defer envFile.Close()

		envFileContent, err := io.ReadAll(envFile)
		if err != nil {
			return nil, err
		}

		envFileLines := strings.Split(string(envFileContent), "\n")
		for _, envFileLine := range envFileLines {
			if envFileLine == "" {
				continue
			}

			k, v, _ := strings.Cut(envFileLine, "=")
			if contains(Required, k) {
				env[k] = v
			}
		}
	}

	return env, nil
}

func loadFromOS() (map[string]string, error) {
	env := make(map[string]string)

	for _, envName := range Required {
		env[envName] = os.Getenv(envName)
	}

	return env, nil
}

func Load() (map[string]string, error) {
	if os.Getenv("ENV") == "production" {
		return check(loadFromOS())
	} else {
		return check(loadFromFiles())
	}
}
